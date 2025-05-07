import express from "express";
import { isAuthenticatedUser } from "../middleware/auth.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import NoticeController from "../controllers/Notice.Controller.mjs";


const router = express.Router();

router.route("/notices")
    .get(isAuthenticatedUser, catchAsyncError(NoticeController.GetNotices))
    .post(isAuthenticatedUser, catchAsyncError(NoticeController.CreateNotice))
    // .delete(isAuthenticatedUser, isUserAdmin, deleteAllNotices);

router.route("/notices/:noticeId")
    .get(isAuthenticatedUser, catchAsyncError(NoticeController.GetNotice))
    .patch(isAuthenticatedUser, catchAsyncError(NoticeController.UpdateNotice))
    .delete(isAuthenticatedUser, catchAsyncError(NoticeController.DeleteNotice));

export default router;
