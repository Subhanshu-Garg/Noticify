import express from "express";
import { getAllNotices, createNotice, deleteAllNotices,getNotice, updateNotice, deleteNotice  } from "../controllers/noticeController.js";
import { isAuthenticatedUser, isUserAdmin } from "../middleware/auth.js";


const router = express.Router();

router.route("/organizations/:organizationID/notices")
    .get(isAuthenticatedUser, getAllNotices)
    .post(isAuthenticatedUser, isUserAdmin,  createNotice)
    .delete(isAuthenticatedUser, isUserAdmin, deleteAllNotices);

router.route("organizations/:organizationID/notices/:noticeId")
    .get(isAuthenticatedUser, getNotice)
    .patch(isAuthenticatedUser, isUserAdmin, updateNotice)
    .delete(isAuthenticatedUser, isUserAdmin, deleteNotice);

export default router;
