import catchAsyncError from "../middleware/catchAsyncError.js";
import Organization from "../models/organizationModel.js";
import AppError from "../utils/AppError.js";

export const registerOrganization = catchAsyncError(async (req, res, next) => {
    const user = req.user;
    const organizationName = req.body.organizationName;
    const organization = await Organization.create({
        organizationName,
        admins: [user._id],
        users: [user._id]
    });

    res.status(201).json({
        success: true,
        message: "Organization registered successfully.",
        organization,
    });
});

export const getAllOrganization = catchAsyncError(async (req, res, next) => {
    const organizations = await Organization.find();
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
})

export const sendJoinRequest = catchAsyncError(async (req, res, next) => {
    const user = req.user;
    const organizationID = req.params.organizationID;
    
    const organization = await Organization.findById(organizationID);
    if(!organization) {
        return next(new AppError("Organization is not found.", 404));
    } else {
        if(await organization.sendJoinRequest(user._id)){
            res.status(200).json({
                success: true,
                message: "Join request sent successfully."
            });
        } else {
            return next(new AppError("You are already a memeber or your request is pending.", 400));
        }
    }
});

export const approveJoinRequest = catchAsyncError(async (req, res, next) => {
    const userID = req.params.userID;
    const organization = req.organization;
    if(await organization.approveUser(userID)){
        //Need to write something for sending a notification to the user whose request is accepted.
        res.status(200).json({
            success: true,
            message: "Succefully approved join request."
        })
    } else {
        return next(new AppError("This users join request doesn't exist.",404));
    }
    
});
