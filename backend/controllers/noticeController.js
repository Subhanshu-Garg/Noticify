import Notice from "../models/noticeModel.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import AppError from "../utils/AppError.js";
import Organization from "../models/organizationModel.js";

//createNotice ---- admin
export const createNotice = catchAsyncError(async function (req, res, next) {
    req.body.createdBy = req.user.id;

    const notice = await Notice.create({
        title: req.body.title,
        notice: req.body.notice,
        createdBy: req.user.id,
        noticeOf: req.params.organizationID
    });
    // req.organization.addNotice(notice._id);
    res.status(201).json({
        message: "Notice created successfully.",
        notice,
    });
});


export const getAllNotices = catchAsyncError(async function (req, res, next) {
    const organizationID = req.params.organizationID;
    const notices = await Notice.find({noticeOf: organizationID});
    notices.reverse();
    if(notices.length === 0){
        return next(new AppError("No notices found for the organization", 404));
    } else {
        res.status(200).json({
            message: "Found all Notices successfully.",
            notices,
        });
    }
});


//delete all Notice - dangerous routes - Admin.
export const deleteAllNotices = catchAsyncError(async function (req, res) {
    // const organization = req.organization;
    const organizationID = req.params.organizationID;
    const result = await Notice.deleteMany({ noticeOf: organizationID });
    // organization.notices = [];
    // await organization.save();
    res
        .status(200)
        .json({ message: "Notices deleted successfully.", data: result });
});

export const getNotice = catchAsyncError(async function (req, res, next) {
    const organizationID = req.params.organizationID;
    const noticeId = req.params.noticeId;
    const notice = await Notice.findById(noticeId).populate("createdBy");
    // const notice = (await Organization.findById(organizationID).populate({
    //     path: "notices",
    //     match: { _id: noticeId }
    // })).notices[0];
    if (notice) {
        res.status(200).json({
            success: true,
            message: "Notice found successfully.",
            notice,
        });
    } else {
        next(new AppError("Notice not found!", 404));
    }
});

// export const replaceNotice = catchAsyncError(async function (req, res, next) {
//     const noticeId = req.params.id;
//     const noticeData = req.body;
//     const updatedNotice = await Notice.findByIdAndUpdate(
//         noticeId,
//         noticeData,
//         {
//             new: true,
//             overwrite: true,
//             runValidators: true,
//         }
//     );
//     if (!updatedNotice) {
//         next(new AppError("Notce not found with given ID", 404));
//     } else {
//         res.status(201).json({
//             message: "Notice updated successfully",
//             data: updatedNotice,
//         });
//     }
// });

export const updateNotice = catchAsyncError(async function (req, res, next) {
    const noticeId = req.params.noticeId;
    const updates = req.body;
    const updatedNotice = await Notice.findByIdAndUpdate(noticeId, updates, {
        new: true,
        runValidators: true,
    });
    if (!updatedNotice) {
        return next(new AppError("Notice not found with given ID", 404));
    } else {
        res.status(200).json({
            success: true,
            message: "Notice updated successfully",
            data: updatedNotice,
        });
    }
});

export const deleteNotice = catchAsyncError(async function (req, res, next) {
    const noticeId = req.params.noticeId;
    const deletedNotice = await Notice.findByIdAndDelete(noticeId);
    // req.organization.notices.remove(noticeId);
    // await req.organization.save();
    if (!deletedNotice) {
        return next(new AppError("Notice not found with given ID", 404));
    } else {
        res.status(200).json({
            success: true,
            message: "Notice deleted successfully",
            deletedNotice,
        });
    }
})
