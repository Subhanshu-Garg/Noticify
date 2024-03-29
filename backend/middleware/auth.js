import catchAsyncError from "./catchAsyncError.js";
import jwt from 'jsonwebtoken';
import User from "../models/userModel.js";
import Organization from "../models/organizationModel.js";
import AppError from '../utils/AppError.js';

export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        const error = new Error("Please login or signup.");
        error.status = 401;
        return next(new AppError("Please login or register",401));
    }
    else {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedData.id);

        // if(user == null) {
        //     return next(new AppError("User not found", 404));
        // }

        req.user = user;
        next();
    }
});

export const isUserAdmin = catchAsyncError(async (req, res, next) => {
    const user = req.user;
    const organizationID = req.params.organizationID;

    const organization = await Organization.findById(organizationID);
    if (!organization) {
        return next(new AppError("Organization not found", 404));
    }
    if (!user.adminOf.includes(organizationID)) {
        return next(new AppError("You are not authorized to perform this action", 403));
    }
    req.organization = organization;
    next();
});

export const isUserMember = catchAsyncError(async (req, res, next) => {
    const user = req.user;
    const organizationID = req.params.organizationID;

    const organization = await Organization.findById(organizationID);
    if(!organization) {
        return next(new AppError("Organization not found", 404));
    }

    if(!user.adminOf.includes(organizationID) && !user.userOf.includes(organizationID)) {
        return next(new AppError("You are not authorized to perform this action", 403));
    }

    req.organization = organization;
    next();
})

// export const authorizeRoles = (role) => {
//     return (req, res, next) => {
//         if (role != req.user.role) {
//             const error = new Error(`Role: ${req.user.role} not allowed to access this.`);
//             error.status = 403;
//             return next(error);
//         }
//         else {
//             next();
//         }
//     }
// }