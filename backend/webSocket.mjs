import { WebSocketServer } from "ws";
import UserModel from "./models/User.Model.mjs";
import MemberShipModel from "./models/MemberShip.Model.mjs";
import cookie from 'cookie'
import RedisPubSubModel from "./models/RedisPubSub.Model.mjs";

const wss = new WebSocketServer({ noServer: true })
const clients = new Map()

wss.on('connection', async (ws, request) => {
    const cookies = cookie.parse(request.headers.cookie || '');
    const token = cookies.token;

    try {
        const user = await UserModel.IsUserLoggedIn(token)
        const memberships = await MemberShipModel.GetMemberShipsByUserId(user._id)
        const orgIds = memberships.map(membership => membership.org._id.toString())
        clients.set(ws, {
            user, 
            orgIds
        })
        for (const orgId of orgIds) {
            RedisPubSubModel.SubscribeToOrg(orgId, clients)
        }
    } catch (err) {
        ws.close(4001, 'Invalid token');
        return;
    }

    ws.on('message', msg => {
        console.info('Recieved message')
    })

    ws.on('close', () => {
        const { orgIds = [] } = clients.get(ws)
        for (const orgId of orgIds) {
            RedisPubSubModel.UnsubscribeToOrg(orgId)
        }
        clients.delete(ws)
    })
})

export default wss