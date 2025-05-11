import * as httpContext from 'express-http-context'
import RedisPubSubModel from '../models/RedisPubSub.Model.mjs'
import ClientClasses from '../classes/Client.Class.mjs'

const ServerSentEventsController = {
    SubscribeEvent
}

export default ServerSentEventsController

const clientsMap = new Map()


async function SubscribeEvent(req, res, next) {
    const user = httpContext.get('user')
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    res.flushHeaders()
    
    const orgIds = user.memberships.map(membership => membership.org._id.toString())
    const client = new ClientClasses.ServerSentClient(res, { user, orgIds })
    clientsMap.set(res,  client)

    for (const orgId of orgIds) {
        await RedisPubSubModel.SubscribeToOrg(orgId, clientsMap)
    }
    // Send an initial message
    res.write('data: {"message": "Connection established"}\n\n');

    res.on('close', () => {
        RedisPubSubModel.UnsubscribeToOrg()
    })
}
