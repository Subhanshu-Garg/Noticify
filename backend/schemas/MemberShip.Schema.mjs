import mongoose from "mongoose";
import { Organization } from "../models/Organization.Model.mjs";
import { User } from "../models/User.Model.mjs";
import ROLES from "../constants/User.Constants.mjs";

const MemberShipSchema = new mongoose.Schema({
    org: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Organization,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    role: {
        type: String,
        enum: ROLES.ENUM,
        default: "user"
    }
})

export default MemberShipSchema