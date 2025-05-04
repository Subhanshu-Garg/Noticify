import ROLES from "../constants/User.Constants.mjs";
import MemberShipModel from "../models/MemberShip.Model.mjs";
import * as httpContext from 'express-http-context'
import UserModel from "../models/User.Model.mjs";
import AppError from "../utils/AppError.mjs";
import HTTP from "../constants/Http.Constants.mjs";

const MemberShipController = {
    CreateMemberShip,
    DeleteMemberShip
}

export default MemberShipController

async function CreateMemberShip(req, res, next) {
    const { orgId } = req.params
    const { userId, userRole = ROLES.MAP.USER } = req.body 
    const user = httpContext.get('user')
    const loginUserId = user._id
    
    let toCreateUserId = loginUserId
    if (userRole === ROLES.MAP.ADMIN) {
        toCreateUserId = userId
        if (!toCreateUserId) {
            throw new AppError('Unvalid request', HTTP.STATUS_CODE.BAD_REQUEST)
        }

        // Check Valid User
        await UserModel.GetUserById(toCreateUserId)

        const memberShip = await MemberShipModel.GetMemberShipByUserIdOrgId(loginUserId, orgId)

        if (memberShip.role !== ROLES.MAP.ADMIN) {
            throw new AppError('Unauthorized request', HTTP.STATUS_CODE.UNAUTHORIZED)
        }
    }

    await MemberShipModel.CreateMemberShip(toCreateUserId, orgId, userRole)

    res.status(201).json({
        success: true,
        message: "Subscribed successfully."
    })
}

async function DeleteMemberShip(req, res, next) {
    const { orgId } = req.params
    const user = httpContext.get('user')
    const loginUserId = user._id

    await MemberShipModel.DeleteMemberShip(loginUserId, orgId)

    res.status(201).json({
        success: true,
        message: "Unsubscribed successfully."
    })
}