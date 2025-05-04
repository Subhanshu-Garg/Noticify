import HTTP from "../constants/Http.Constants.mjs";
import UserModel from "../models/User.Model.mjs"
import AppError from "../utils/AppError.mjs";
import sendToken from "../utils/jwtToken.mjs";

const UserController = {
    RegisterUser,
    LoginUser,
    LogoutUser,
    ForgotPassword,
    ResetPassword
}

export default UserController


async function RegisterUser(req, res, next) {
    const user = await UserModel.CreateUser(req.body);
    sendToken(user, 201, "User registered successfully.", res);
}

async function LoginUser(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError("Please enter email and password", HTTP.STATUS_CODE.BAD_REQUEST));
    }
    const user = await UserModel.LoginUser(email, password);
    sendToken(user, 200, "Login successfully.", res);
}

async function LogoutUser(req, res, next) {
    if (!req.cookies.token) {
        return next(new AppError("Please login or register", HTTP.STATUS_CODE.UNAUTHORIZED));
    }
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "Logged out successfully."
    });
}

async function ForgotPassword(req, res, next) {
    // To be implemented
}

async function ResetPassword(req, res, next) {
    // To be implemented
}
