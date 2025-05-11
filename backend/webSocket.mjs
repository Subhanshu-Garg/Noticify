import { WebSocketServer } from "ws";
import UserModel from "./models/User.Model.mjs";
import MemberShipModel from "./models/MemberShip.Model.mjs";
import cookie from 'cookie'
import RedisPubSubModel from "./models/RedisPubSub.Model.mjs";
import ClientClasses from "./classes/Client.Class.mjs";

const wss = new WebSocketServer({ noServer: true })
const clients = new Map()

wss.on('connection', async (ws, request) => {
    const cookies = cookie.parse(request.headers.cookie || '');
    const token = cookies.token;

    try {
        const user = await UserModel.IsUserLoggedIn(token)
        const memberships = await MemberShipModel.GetMemberShipsByUserId(user._id)
        const orgIds = memberships.map(membership => membership.org._id.toString())

        const client = new ClientClasses.WebSocketClient(ws, {user, orgIds})
        clients.set(ws, client)
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
        const client = clients.get(ws)
        const { orgIds = [] } = client.meta
        for (const orgId of orgIds) {
            RedisPubSubModel.UnsubscribeToOrg(orgId)
        }
        clients.delete(ws)
    })
})

export default wss