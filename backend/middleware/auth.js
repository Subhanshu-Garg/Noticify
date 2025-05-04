import catchAsyncError from "./catchAsyncError.js";
import * as httpContext from 'express-http-context'
import UserModel from "../models/User.Model.mjs";
import MemberShipModel from "../models/MemberShip.Model.mjs";

export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    const user = await UserModel.IsUserLoggedIn(token)
    try {
        const memberships = await MemberShipModel.GetMemberShipsByUserId(user._id)
        user.memberships = memberships
    } catch (error) {
        console.info('No active membership of the user')
    }

    httpContext.set('user', user)

    next();
});
