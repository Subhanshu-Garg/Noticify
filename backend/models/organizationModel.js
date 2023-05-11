import mongoose from "mongoose";
import catchAsyncError from "../middleware/catchAsyncError.js";

const organizationSchema = new mongoose.Schema({
    organizationName: {
        type: String,
        required: [true, "Please enter your organization name."],
        trim: true,
        max: 30,
        unique: true,
    },
    admins: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    ],
    joinRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    notices: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Notice",
        },
    ],
});

organizationSchema.methods.sendJoinRequest = async function(userId) {
    if(!(this.joinRequests.includes(userId) || this.users.includes(userId))){
        this.joinRequests.push(userId);
        this.save();
        return true;
    }  else {
        return false;
    }
};

organizationSchema.methods.approveUser = async function (userId) {
    if(this.joinRequests.includes(userId)){
        this.users.push(userId);
        this.joinRequests.remove(userId);
        await this.save();
        return true;
    } else {
        return false;
    }  
};

organizationSchema.methods.addNotice = async function(noticeId) {
    if(!this.notices.includes(noticeId)){
        this.notices.push(noticeId);
        await this.save();
    }
    return this;
};


const Organization = mongoose.model("Organization", organizationSchema);
export default Organization;
