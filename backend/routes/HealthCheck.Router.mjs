import express from "express";
import catchAsyncError from "../middleware/catchAsyncError.js";
import HealthCheckController from "../controllers/HealthCheck.Controller.mjs";


const router = express.Router();

router.route("/health").get(catchAsyncError(HealthCheckController.HealthCheck))
        
export default router;
