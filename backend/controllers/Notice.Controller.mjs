import WSS from "../constants/WebSocket.Constant.mjs";
import NoticeModel from "../models/Notice.Model.mjs";

const NoticeController = {
    CreateNotice,
    GetNotices,
    GetNotice,
    UpdateNotice,
    DeleteNotice
}

export default NoticeController

async function CreateNotice(req, res, next) {
    const notice = await NoticeModel.CreateNotice(req.body)
    await NoticeModel.BroadCastNotice(notice, WSS.EVENTS.NEW_NOTICE)
    res.status(201).json({
        success: true,
        message: "Notice created successfully.",
        notice,
    })
}

async function GetNotices(req, res, next) {
    const { query = {} } = req
    const notices = await NoticeModel.GetNotices(query)
    res.status(200).json({
        success: true,
        message: "Found all Notices successfully.",
        notices,
    });
}

async function GetNotice(req, res, next) {
    const { noticeId = '' } = req.params
    const notice = await NoticeModel.GetNoticeById(noticeId)
    res.status(200).json({
        success: true,
        message: "Notice found successfully.",
        notice,
    })
}

async function UpdateNotice(req, res, next) {
    const { noticeId = '' } = req.params
    const notice = await NoticeModel.UpdateNoticeById(noticeId, req.body)
    await NoticeModel.BroadCastNotice(notice, WSS.EVENTS.UPDATE_NOTICE)
    res.status(200).json({
        success: true,
        message: "Notice updated successfully",
        notice,
    })
}

async function DeleteNotice(req, res, next) {
    const { noticeId = '' } = req.params
    const notice = await NoticeModel.DeleteNoticeById(noticeId)
    await NoticeModel.BroadCastNotice(notice, WSS.EVENTS.DELETE_NOTICE)
    res.status(200).json({
        success: true,
        message: "Notice deleted successfully",
        notice,
    });
}
