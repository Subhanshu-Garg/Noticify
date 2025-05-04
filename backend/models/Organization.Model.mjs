import mongoose from "mongoose";
import OrganizationSchema from "../schemas/Oragnization.Schema.mjs";
import * as httpContext from 'express-http-context'
import runTransaction from "../utils/runTransaction.mjs";
import MemberShipModel from "./MemberShip.Model.mjs";
import ROLES from "../constants/User.Constants.mjs";
import AppError from "../utils/AppError.mjs";
import ORG_CONSTANTS from "../constants/Organization.Constants.mjs";
import HTTP from "../constants/Http.Constants.mjs";

export const Organization = new mongoose.model('Organization', OrganizationSchema)

const OrganizationModel = {
    CreateOrganization,
    GetOrganizations,
    GetOrganizationById
}

export default OrganizationModel

async function CreateOrganization(organizationData) {
    const user = httpContext.get('user')
    await runTransaction(async() => {
        const org = await Organization.create(organizationData)

        if (!org) {
            throw new AppError('Organization not created', HTTP.STATUS_CODE.BAD_REQUEST)
        }

        await MemberShipModel.CreateMemberShip(user._id, org._id, ROLES.MAP.ADMIN)
    })
    return organizationData
}

async function GetOrganizations(query = {}) {
    const { page = 1, limit = 10, scope = 'all' } = query

    const user = httpContext.get('user')

    if (scope === ORG_CONSTANTS.SCOPE.SUBSCRIBED) {
        const memberships = await MemberShipModel.GetMemberShipsByUserId(user._id, {
            page,
            limit
        })
    
        const orgs = memberships.map(membership => {
            const org = membership.org
            org.role = membership.role
            org.isSubscribed = true
            return org
        })
        return orgs
    }
    const offset = (page - 1) * limit
    const orgs = await Organization.find().skip(offset).limit(limit).sort({
        createdAt: -1
    })
    if (!orgs || orgs.length === 0) {
        throw new AppError('No organizations found!', HTTP.STATUS_CODE.NOT_FOUND) 
    }
   return await MemberShipModel.AddIsSubscribedFlag(user._id, orgs)
}

async function GetOrganizationById(orgId) {
    const org = await Organization.findById(orgId)
    if (!org) {
        throw new AppError('No organization found!', HTTP.STATUS_CODE.NOT_FOUND)
    }
    return org
}
