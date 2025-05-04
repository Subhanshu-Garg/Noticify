import express from "express";
import { isAuthenticatedUser } from "../middleware/auth.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import MemberShipController from "../controllers/MemberShip.Controller.mjs";


const router = express.Router();

router.route("/memberships/:orgId")
    .post(isAuthenticatedUser, catchAsyncError(MemberShipController.CreateMemberShip))
    .delete(isAuthenticatedUser, catchAsyncError(MemberShipController.DeleteMemberShip))
        
export default router;
