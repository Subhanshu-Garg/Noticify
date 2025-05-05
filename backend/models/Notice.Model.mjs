import mongoose from "mongoose";
import NoticeSchema from "../schemas/Notice.Schema.mjs";
import * as httpContext from 'express-http-context'
import MemberShipModel from "./MemberShip.Model.mjs";
import HTTP from "../constants/Http.Constants.mjs";
import AppError from "../utils/AppError.mjs";
import RedisPubSubModel from "./RedisPubSub.Model.mjs";

const Notice = new mongoose.model('Notice', NoticeSchema)

const NoticeModel = {
    CreateNotice,
    GetNotices,
    GetNoticeById,
    UpdateNoticeById,
    DeleteNoticeById,
    BroadCastNotice
}

export default NoticeModel

async function CreateNotice(noticeData) {
    const user = httpContext.get('user')

    const isUserAdmin = await MemberShipModel.IsUserAdmin(user._id, noticeData.org)
    if (!isUserAdmin) {
        throw new AppError('Not authorized to perform this action', HTTP.STATUS_CODE.UNAUTHORIZED)
    }
    noticeData.createdBy = user._id
    const createdNotice = await Notice.create(noticeData)
    const notice = await Notice.findById(createdNotice._id).populate('org', '_id name').lean()
    notice.orgId = notice.org._id
    notice.orgName = notice.org.name
    return notice
}

async function GetNotices(query = {}) {
    const { page = 1, limit = 10 } = query
    const offset = (page - 1) * limit
    const user = httpContext.get('user')
    const memberShips = await MemberShipModel.GetMemberShipsByUserId(user._id)

    const orgIds = memberShips.map(memberShip => memberShip.org._id)

    const notices = await Notice.find({
        org: {
            $in: [orgIds]
        }
    }).skip(offset).limit(limit).sort({ createdAt: -1 }).populate('org', '_id name').lean()
    
    const returnNotices = notices.map(notice => {
        return {
            ...notice,
            orgId: notice.org._id,
            orgName: notice.org.name
        }
    })
    return returnNotices
}

async function GetNoticeById(noticeId) {
    const user = httpContext.get('user')
    const notice = await Notice.findById(noticeId).populate('org', '_id name').lean()

    if(!notice) {
        throw new AppError('Notice not found', HTTP.STATUS_CODE.NOT_FOUND)
    }

    const isUserMember = await MemberShipModel.IsUserMember(user._id, notice.org._id)

    if (!isUserMember) {
        throw new AppError('Not authorized to perform this action', HTTP.STATUS_CODE.UNAUTHORIZED)
    }

    notice.orgId = notice.org._id
    notice.orgName = notice.org.name
    return notice
}

async function UpdateNoticeById(noticeId, updateData) {
    const user = httpContext.get('user')
    const notice = await GetNoticeById(noticeId)
    
    const isUserAdmin = await MemberShipModel.IsUserAdmin(user._id, notice.orgId)

    if(!isUserAdmin) {
        throw new AppError('Not authorized', HTTP.STATUS_CODE.UNAUTHORIZED)
    }

    const updatedNotice = await Notice.findByIdAndUpdate(noticeId, updateData, {
        new: true,
        runValidators: true,
    }).lean()

    updatedNotice.orgId = notice.orgId
    updatedNotice.orgName = notice.orgName
    return updatedNotice
}

async function DeleteNoticeById(noticeId) {
    const user = httpContext.get('user')
    const notice = await GetNoticeById(noticeId)
    
    const isUserAdmin = await MemberShipModel.IsUserAdmin(user._id, notice.orgId)

    if(!isUserAdmin) {
        throw new AppError('Not authorized', HTTP.STATUS_CODE.UNAUTHORIZED)
    }

    const deletedNotice = await Notice.findByIdAndDelete(noticeId).lean()
    console.info('Notice deleted')
    return deletedNotice
}

async function BroadCastNotice(notice, type) {
    await RedisPubSubModel.PublishToOrg(notice.orgId, { type, notice })
}