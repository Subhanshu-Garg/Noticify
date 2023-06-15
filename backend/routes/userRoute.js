import express from "express";
import { forgotPassword, getAllUser, getMe, getSpecificUser, loginUser, logoutUser, registerUser, resetPassword } from "../controllers/userController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser); 
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/users").get(isAuthenticatedUser, getAllUser);
router.route("/users/me").get(isAuthenticatedUser,getMe);
router.route("/users/:id").get(isAuthenticatedUser,getSpecificUser);

export default router;