import express from "express";
import { isAuthenticatedUser } from "../middleware/auth.js";
import UserController from "../controllers/User.Controller.mjs";

import catchAsyncError from "../middleware/catchAsyncError.js";

const router = express.Router();

router.route("/register").post(catchAsyncError(UserController.RegisterUser));
router.route("/login").post(catchAsyncError(UserController.LoginUser));
router.route("/logout").get(catchAsyncError(UserController.LogoutUser));
router.route("/password/forgot").post(catchAsyncError(UserController.ForgotPassword));
router.route("/password/reset/:token").put(isAuthenticatedUser, catchAsyncError(UserController.ResetPassword));

// router.route("/users").get(isAuthenticatedUser, getAllUser);
// router.route("/users/me").get(isAuthenticatedUser,getMe);
// router.route("/users/:id").get(isAuthenticatedUser,getSpecificUser);

export default router;