import catchAsyncError from "../middleware/catchAsyncError.js";
import User from "../models/userModel.js";
import sendToken from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
import AppError from "../utils/AppError.js";
import { equal } from "assert";


export const registerUser = catchAsyncError(async (req, res, next) =>{
    const {fname, lname, email, password } = req.body;
    
    const user = await User.create({
        fname, lname, email, password,
        avatar: {
            public_id: "this is sample id",
            url: "profilePicUrl"
        }
    });

    sendToken(user,201,"Register Successfully",res);
});

export const loginUser = catchAsyncError(async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return next(new AppError("Please enter email and password.",400));
    }

    const user = await User.findOne({ email: email }).select("+password");

    if(!user) {
        return next(new AppError("Invalid email or password.",401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched) {
        return next(new AppError("Invalid email or password.",401));
    }

    sendToken(user, 200,"Log In Successfully", res)
});


export const logoutUser = catchAsyncError(async (req, res, next) => {
    if(req.cookies.token) {
        res.clearCookie("token");
        res.status(200).json({
            success: true,
            message: "Logged Out"
        });
    }
    else {
        next(new AppError("User is already logged out.",400))
    }
});

export const forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});

    if(!user) {
        const error = new Error("User not found.");
        error.status = 404;
        return next(error);
    } 
    const resetToken = user.getResetPasswordToken();
    user.save({ validateBeforSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const message = `Your reset password URL is :- \n\n${resetPasswordUrl} \n\nIf you have not requested this email, please ignore it.`
    

    try {
        await sendEmail({
            email: user.email,
            subject: "Digital Notice Board Password Recovery.",
            message
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully.`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        user.save({ validateBeforSave: false });

        error.status = 500;
        return next(error);
    }
});

export const resetPassword = catchAsyncError(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now()}
    });
    if(!user) {
        const error = new Error("Reset password token is invalid or has been expired.");
        error.status = 400;
        return next(error);
    } 

    if(req.body.password != req.body.confirmPassword) {
        const error = new Error("Password does not match.");
        error.status = 400;
        return next(error);
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, "Reset password successfully.", res);
});

export const getAllUser = catchAsyncError(async (req, res, next) => {
    const users = await User.find();
    if(users.length == 0) {
        return next(new AppError("No user exist.", 404));
    } else {
        res.status(200).json({
            success: true,
            message: "Found users.",
            users
        });
    }
});

export const getMe = catchAsyncError(async (req, res, next) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
});

export const getSpecificUser = catchAsyncError(async (req, res, next) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if(!user) {
        return next(new AppError("User not found with given ID.", 404));
    } else {
        res.status(200).json({
            success: true,
            message: "User found successfully",
            user
        })
    }
});

// export const updateUser = catchAsyncError(async (req, res, next) => {
//     const userId = req.params.id;
//     const user = await User.findByIdAndUpdate(userId,req.body,)
// })