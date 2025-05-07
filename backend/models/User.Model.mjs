import mongoose from "mongoose";
import UserSchema from "../schemas/User.Schema.mjs";
import jwt from 'jsonwebtoken';
import AppError from "../utils/AppError.mjs";
import HTTP from "../constants/Http.Constants.mjs";
import configs from "../config/config.mjs";

export const User = new mongoose.model("User", UserSchema);

const UserModel = {
    CreateUser,
    GetUserByEmail,
    GetUserById,
    UpdateUser,
    DeleteUser,
    LoginUser,
    IsUserLoggedIn
}

export default UserModel;



async function CreateUser(userData) {
    const user = await User.create(userData);
    console.info("User created successfully:", user);
    return user;
} 

async function GetUserByEmail(email) {
    const user = await User.findOne({ email });
    if (!user) {
        console.error("User not found with the given email:", email);
        throw new AppError("User not found with the given email", HTTP.STATUS_CODE.NOT_FOUND);
    }
    return user;
}

async function GetUserById(userId) {
    const user = await User.findById(userId);
    if (!user) {
        console.error("User not found with the given ID:", userId);
        throw new AppError("User not found with the given ID", HTTP.STATUS_CODE.NOT_FOUND);
    }
    return user;
}

async function UpdateUser(userId, updateData) {
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!user) {
        console.error("User not found with the given ID:", userId);
        throw new AppError("User not found with the given ID", HTTP.STATUS_CODE.NOT_FOUND);
    }
    console.info("User updated successfully:", user);
    return user;
}

async function DeleteUser(userId) {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
        console.error("User not found with the given ID:", userId);
        throw new AppError("User not found with the given ID", HTTP.STATUS_CODE.NOT_FOUND);
    }
    console.info("User deleted successfully:", user);
    return user;
}

async function LoginUser(email, password) {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        console.error("Invalid email or password");
        throw new AppError("Invalid email or password", HTTP.STATUS_CODE.UNAUTHORIZED);
    }
    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) {
        console.error("Invalid email or password");
        throw new AppError("Invalid email or password", HTTP.STATUS_CODE.UNAUTHORIZED);
    }
    return user;
}

async function IsUserLoggedIn(token) {
    if (!token) {
        throw new AppError('Please login or register', HTTP.STATUS_CODE.UNAUTHORIZED)
    }
    const decodedData = jwt.verify(token, configs.JWT_SECRET);
    const user = await GetUserById(decodedData.id)
    return user
}

async function ChangePassword(userId, newPassword) {
    const user = await GetUserById(userId);
     
    await user.save();
    console.info("User password changed successfully:", user);
    return user;
}




