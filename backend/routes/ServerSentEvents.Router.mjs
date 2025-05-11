import express from "express";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ServerSentEventsController from "../controllers/ServerSentEvents.Controller.mjs";
import { isAuthenticatedUser } from "../middleware/auth.js";


const router = express.Router();

router.route("/events").get(isAuthenticatedUser, catchAsyncError(ServerSentEventsController.SubscribeEvent))
        
export default router;
