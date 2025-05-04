import mongoose from "mongoose";
import NOTICE from "../constants/Notice.Constants.mjs";

const AttachementSchema = new mongoose.Schema({
    name: String,
    url: String
})

const NoticeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter title."],
        max: 30,
        trim: true
    },
    content: {
        type: String,
        required: [true, "Please enter notice."]
    },
    org: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: [true, "Please enter the organization for which notice is"]
    },
    tags: [String],
    attachements: [AttachementSchema],
    priority: {
        type: String,
        enum: NOTICE.PRIORITY.ENUM,
        default: NOTICE.PRIORITY.MAP.MEDIUM
    },
    isRead: {
        type: Boolean,
        default: false // This is specific to user can't lie here..
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

export default NoticeSchema