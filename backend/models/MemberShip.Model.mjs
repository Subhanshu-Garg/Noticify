import mongoose from "mongoose";
import MemberShipSchema from "../schemas/MemberShip.Schema.mjs";
import AppError from "../utils/AppError.mjs";
import ROLES from "../constants/User.Constants.mjs";
import HTTP from "../constants/Http.Constants.mjs";

export const MemberShip = new mongoose.model('MemberShip', MemberShipSchema)

const MemberShipModel = {
    CreateMemberShip,
    GetMemberShipsByUserId,
    GetMemberShipByUserIdOrgId,
    AddIsSubscribedFlag,
    IsUserAdmin,
    IsUserMember,
    GetMemberShipByOrgId,
    DeleteMemberShip
}

export default MemberShipModel

async function CreateMemberShip(userId, orgId, userRole) {
    const memberShip = await MemberShip.create({
        org: orgId,
        user: userId,
        role: userRole
    })
    if (!memberShip) {
        throw new AppError('Error creating membership', HTTP.STATUS_CODE.BAD_REQUEST)
    }
    return memberShip
}

async function GetMemberShipByUserIdOrgId(userId, orgId) {
    const memberShip = await MemberShip.findOne({
        user: userId,
        org: orgId
    })

    if (!memberShip) {
        throw new AppError('Membership not found!', HTTP.STATUS_CODE.BAD_REQUEST)
    }

    return memberShip
}

async function GetMemberShipsByUserId(userId, options = {}) {
    const { page, limit } = options
    let memberShips = MemberShip.find({
        user: userId
    }).populate('org')
    
    if(page && limit) {
        const offset = (page - 1) * limit
        memberShips = memberShips.skip(offset).limit(limit)
    }

    memberShips = await memberShips

    if (memberShips.length === 0) {
        throw new AppError('Membership not found', HTTP.STATUS_CODE.NOT_FOUND)
    }
    return memberShips
}

async function GetMemberShipByOrgId(orgId, options = {}) {
    const { page, limit } = options
    let memberShips = MemberShip.find({
        org: orgId
    }).populate('user')
    
    if(page && limit) {
        const offset = (page - 1) * limit
        memberShips = memberShips.skip(offset).limit(limit)
    }

    memberShips = await memberShips

    if (memberShips.length === 0) {
        throw new AppError('Membership not found', HTTP.STATUS_CODE.NOT_FOUND)
    }
    return memberShips
}


async function AddIsSubscribedFlag(userId, orgs) {
    const orgIds = orgs.map(org => org._id);
    
    const memberShips = await MemberShip.find({
        user: userId,
        org: { $in: orgIds }
    }).lean();

    // Normalize org IDs to strings once
    const subscribedSet = new Set(
        memberShips.map(m => m.org.toString())
    );

    const returnOrgs = orgs.map(org => {
        const plain = org.toObject();
        plain.isSubscribed = subscribedSet.has(org._id.toString());
        return plain;
    });

    return returnOrgs;
}


async function IsUserAdmin(userId, orgId) {
    if (!userId || !orgId) {
        return false
    }
    const memberShip = await MemberShip.findOne({
        user: userId,
        org: orgId
    })
    if (!memberShip || memberShip.role !== ROLES.MAP.ADMIN) {
        return false
    }
    return true
}

async function IsUserMember(userId, orgId) {
    if (!userId || !orgId) {
        return false
    }
    const memberShip = await MemberShip.findOne({
        user: userId,
        org: orgId
    })
    if (!memberShip) {
        return false
    }
    return true
}

async function DeleteMemberShip(userId, orgId) {
    const memberShips = await GetMemberShipByOrgId(orgId)
    
    const isHavingAnotherAdmin = memberShips.some(memberShip => {
        return memberShip.role === ROLES.MAP.ADMIN && memberShip.user._id.toString() !== userId.toString()
    })

    if(!isHavingAnotherAdmin) {
        throw new AppError('Only one admin member left', HTTP.STATUS_CODE.FORBIDDEN)
    }

    const memberShip = await MemberShip.findOneAndDelete({
        user: userId,
        org: orgId
    })

    return memberShip
}