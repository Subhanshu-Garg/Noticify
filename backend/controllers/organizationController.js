import catchAsyncError from "../middleware/catchAsyncError.js";
import Organization from "../models/organizationModel.js";
import AppError from "../utils/AppError.js";

export const registerOrganization = catchAsyncError(async (req, res, next) => {
    const organizationName = req.body.organizationName;
    const organization = await Organization.create({
        organizationName,
    });
    const admin = req.user;
    admin.beAdmin(organization._id);

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
    const organizations = await Organization.find(query);
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

export const approveJoinRequest = catchAsyncError(async (req, res, next) => {
    const userID = req.params.userID;
    const admin = req.user;
    const organization = req.organization;
    if(await organization.approveUser(userID) && await user.addUser(userID)){
        //Need to write something for sending a notification to the user whose request is accepted.
        res.status(200).json({
            success: true,
            message: "Succefully approved join request."
        })
    } else {
        return next(new AppError("This users join request doesn't exist.",404));
    }
    
});
