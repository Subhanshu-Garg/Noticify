import express from "express";
import { sendJoinRequest, registerOrganization, getAllOrganization, getOrganization, approveJoinRequest } from "../controllers/organizationController.js";
import { isAuthenticatedUser, isUserAdmin } from "../middleware/auth.js";

const router = express.Router();

router.route("/organizations").get(isAuthenticatedUser,getAllOrganization);
router.route("/organizations").post(isAuthenticatedUser,registerOrganization);
// router.route("/organizations/:id/approve/user").put(isAuthenticatedUser,isAdmin,approveUser);

router.route("/organizations/:organizationID").get(isAuthenticatedUser,getOrganization);
router.route("/organizations/:organizationID/join").post(isAuthenticatedUser,sendJoinRequest);
router.route("/organizations/:organizationID/approve/:userID").post(isAuthenticatedUser,isUserAdmin,approveJoinRequest);





export default router;