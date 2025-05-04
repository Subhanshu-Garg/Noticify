import mongoose from "mongoose";

const OrganizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your organization name."],
        trim: true,
        max: 30,
        unique: true,
    },
    description: {
        type: String,
        required: [true, "Please enter your organization description."],
        trim: true,
        max: 1000,
    },
    logoUrl: {
        type: String
    }
}, {
    timestamps: true
});

export default OrganizationSchema;
