import HTTP from "../constants/Http.Constants.mjs";
import AppError from "../utils/AppError.mjs";   

export function errorMiddleware(err, req, res, next)  {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Wrong Mongodb Id error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new AppError(message, HTTP.STATUS_CODE.BAD_REQUEST);
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new AppError(message, HTTP.STATUS_CODE.BAD_REQUEST);
    }

    // Wrong JWT error
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, Try again `;
        err = new AppError(message,HTTP.STATUS_CODE.BAD_REQUEST);
    }

    // JWT EXPIRE error
    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token is Expired, Try again `;
        err = new AppError(message, HTTP.STATUS_CODE.BAD_REQUEST);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};