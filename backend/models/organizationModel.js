import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
    organizationName: {
        type: String,
        required: [true, "Please enter your organization name."],
        trim: true,
        max: 30,
        unique: true,
    },
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
        }
    ],
    admins: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ]
});

organizationSchema.methods.sendJoinRequest = async function(userId) {
    if(!(this.joinRequests.includes(userId))){
        this.joinRequests.push(userId);
        await this.save();
        return true;
    }  else {
        return false;
    }
};


//Need to re-consider 
organizationSchema.methods.approveUser = async function (userId, role) {
    if(this.joinRequests.includes(userId)){
        this.joinRequests.remove(userId);
        if(role === "user")
            this.users.push(userId);
        else if(role === "admin")
            this.admins.push(userId);
        await this.save();
        return true;
    } else {
        return false;
    }  
};

organizationSchema.methods.rejectJoinRequest = async function(userId) {
    if(this.joinRequests.includes(userId)){
        this.joinRequests.pull(userId);
    }
    this.save();
    return true;
}

// organizationSchema.methods.addNotice = async function(noticeId) {
//     if(!this.notices.includes(noticeId)){
//         this.notices.push(noticeId);
//         await this.save();
//     }
//     return this;
// };


const Organization = mongoose.model("Organization", organizationSchema);
export default Organization;
