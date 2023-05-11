import mongoose, { mongo } from "mongoose";

const noticeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter title."],
        trim: true
    },
    notice: {
        type: String,
        required: [true, "Please enter notice."]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    expiryDate: {
        type: Date,
        default: new Date(Date.now() + 7*24*60*60*1000)
    }
});

export default mongoose.model("Notice",noticeSchema);