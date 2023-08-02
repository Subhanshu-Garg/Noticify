import express from "express";
import { sendJoinRequest, registerOrganization, getOrganization, approveJoinRequest, getOrganizations, rejectJoinRequest } from "../controllers/organizationController.js";
import { isAuthenticatedUser, isUserAdmin } from "../middleware/auth.js";

const router = express.Router();

router.route("/organizations").get(isAuthenticatedUser,getOrganizations);
router.route("/organizations").post(isAuthenticatedUser,registerOrganization);
//router.route("/organizations").delete()


router.route("/organizations/:organizationID").get(isAuthenticatedUser,getOrganization);
router.route("/organizations/:organizationID/join").post(isAuthenticatedUser,sendJoinRequest);
router.route("/organizations/:organizationID/accept/:userID").post(isAuthenticatedUser,isUserAdmin,approveJoinRequest);
router.route("/organizations/:organizationID/reject/:userID").post(isAuthenticatedUser,isUserAdmin,rejectJoinRequest)


export default router;