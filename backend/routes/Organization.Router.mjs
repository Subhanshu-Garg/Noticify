import express from "express";
import { isAuthenticatedUser } from "../middleware/auth.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import OrganizationController from "../controllers/Organization.Controller.mjs";

const router = express.Router();

router.route("/organizations").get(isAuthenticatedUser,catchAsyncError(OrganizationController.GetOrganizations));
router.route("/organizations").post(isAuthenticatedUser,catchAsyncError(OrganizationController.CreateOrganization));
router.route("/organizations/:orgId").get(isAuthenticatedUser,catchAsyncError(OrganizationController.GetOrganization));

// router.route("/organizations/:organizationID/join").post(isAuthenticatedUser,sendJoinRequest);
// router.route("/organizations/:organizationID/accept/:userID").post(isAuthenticatedUser,isUserAdmin,approveJoinRequest);
// router.route("/organizations/:organizationID/reject/:userID").post(isAuthenticatedUser,isUserAdmin,rejectJoinRequest)


export default router;