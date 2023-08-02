import catchAsyncError from "../middleware/catchAsyncError.js";
import Organization from "../models/organizationModel.js";
import User from "../models/userModel.js";
import AppError from "../utils/AppError.js";

export const registerOrganization = catchAsyncError(async (req, res, next) => {
    const organizationName = req.body.organizationName;
    const organization = await Organization.create({
        organizationName,
        admins: [req.user]
    });
    const admin = req.user;
    admin.addOrganization(organization._id, "admin");

    res.status(201).json({
        success: true,
        message: "Organization registered successfully.",
        organization,
    });
});


export const getOrganizations = catchAsyncError(async (req, res, next) => {
    let query = {};
    if(req.query.organizations === "admin"){
        query = {
            _id: {$in: req.user.adminOf}
        }
    }
    else if(req.query.organizations === "user"){
        query = {
            _id: {$in: req.user.userOf}
        }
    }
    const organizations = await Organization.find(query).populate("users").populate("admins").populate("joinRequests");
    if(organizations.length == 0){
        return next(new AppError("No organization found!", 404));
    } else {
        res.status(200).json({
            success: true,
            message: "Found all organizations",
            organizations
        })
    }
});

export const getOrganization = catchAsyncError(async (req, res, next) => {
    const organization = await Organization.findById(req.params.organizationID);
    if(organization) {
        res.status(200).json({
            success: true,
            message: "Found organization successfully.",
            organization
        });
    } else {
        return next(new AppError("Organization doesn't exist with given ID.",404));
    }
});

export const sendJoinRequest = catchAsyncError(async (req, res, next) => {
    const organizationID = req.params.organizationID;
    const user = req.user;
    
    const organization = await Organization.findById(organizationID);
    if(!organization) {
        return next(new AppError("Organization is not found.", 404));
    } 
    else if(user.userOf.includes(organizationID)) {
        return next(new AppError("You are already a member of this organization.", 400));
    }
    else if(user.adminOf.includes(organizationID)) {
        return next(new AppError("You are already a admin of this organization.", 400))
    }
    if(await organization.sendJoinRequest(user._id)){
        res.status(200).json({
            success: true,
            message: "Join request sent successfully."
        });
    } else {
        return next(new AppError("Your request is pending.", 400));
    }
});


//Need to reconsider it.
export const approveJoinRequest = catchAsyncError(async (req, res, next) => {
    const userID = req.params.userID;
    // const user = User.findById(userID);
    // console.log(user);
    const admin = req.user;
    const organization = req.organization;

    await User.findByIdAndUpdate(userID, { $push: {userOf: organization._id}})
    await organization.approveUser(userID, "user");
    // await user.addOrganization(organization._id, "user");
    //addOrganization was not working, I don't know why thatswhy i implemented findbyid and update.
    

    res.status(200).json({
        success:true,
        message: "Succefully approved join request."
    })
});

export const rejectJoinRequest = catchAsyncError(async (req, res, next) => {
    const userID = req.params.userID;
    const admin = req.user;
    const organization = req.organization;

    await organization.rejectJoinRequest(userID);

    res.status(200).json({
        success: true,
        message: "Successfully rejected join request."
    })
})
