import OrganizationModel from "../models/Organization.Model.mjs";

const OrganizationController = {
    CreateOrganization,
    GetOrganization,
    GetOrganizations
}

export default OrganizationController

async function CreateOrganization(req, res, next) {
    const org = await OrganizationModel.CreateOrganization(req.body) 
    res.status(201).json({
        success: true,
        message: "Organization created successfully.",
        organization: org,
    });
}

async function GetOrganization(req, res, next) {
    const { orgId = '' } = req.params
    const org = await OrganizationModel.GetOrganizationById(orgId)

    res.status(200).json({
        success: true,
        message: "Found organization successfully.",
        organization: org
    });
}

async function GetOrganizations(req, res, next) {
    const { query = {} } = req
    const orgs = await OrganizationModel.GetOrganizations(query)

    res.status(200).json({
        success: true,
        message: "Found all organizations",
        organizations: orgs
    })
}
