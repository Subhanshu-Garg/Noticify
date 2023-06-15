import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
const saltRounds = 10;
import jwt from "jsonwebtoken";
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: [true, "Please enter your first name."],
        maxLength: [50, "Name cannot exceed 50 characters."],
    },
    lname: {
        type: String,
        maxLength: [50, "Name cannot exceed 50 characters."],
    },
    email: {
        type: String,
        required: [true, "Please enter your email."],
        unique: true,
        validate:[validator.isEmail,"Please enter a valid email."]
    },
    password: {
        type: String,
        required: [true, "Please enter your password."],
        minLength: [8, "Password should be greater than 8 characters."],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    adminOf: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization"
        }
    ],
    userOf: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization"
        }
    ],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, saltRounds);
});

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
};

userSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString("hex");


    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15*60*1000;
    return resetToken;
};

// JWT TOKEN
userSchema.methods.getJWT = function() {
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    });
};

userSchema.methods.beAdmin = async function(organizationID) {
    this.adminOf.push(organizationID);
    await this.save();

    return this;
}

userSchema.methods.addAdmin = async function(userID) {
    this.userOf.push
    await this.save();
}

const User = mongoose.model("User", userSchema);

export default User;