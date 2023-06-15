import express from "express";
import { sendJoinRequest, registerOrganization, getOrganization, approveJoinRequest, getOrganizations } from "../controllers/organizationController.js";
import { isAuthenticatedUser, isUserAdmin } from "../middleware/auth.js";

const router = express.Router();

router.route("/organizations").get(isAuthenticatedUser,getOrganizations);
router.route("/organizations").post(isAuthenticatedUser,registerOrganization);
//router.route("/organizations").delete()


router.route("/organizations/:organizationID").get(isAuthenticatedUser,getOrganization);
router.route("/organizations/:organizationID/join").post(isAuthenticatedUser,sendJoinRequest);
router.route("/organizations/:organizationID/approve/:userID").post(isAuthenticatedUser,isUserAdmin,approveJoinRequest);



export default router;