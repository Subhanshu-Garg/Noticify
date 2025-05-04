import { WebSocketServer } from "ws";
import UserModel from "./models/User.Model.mjs";
import MemberShipModel from "./models/MemberShip.Model.mjs";
import cookie from 'cookie'

const wss = new WebSocketServer({ noServer: true })
export const clients = new Map()

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
    } catch (err) {
        ws.close(4001, 'Invalid token');
        return;
    }

    ws.on('message', msg => {
        console.info('Recieved message')
    })

    ws.on('close', () => {
        clients.delete(ws)
    })
})

export default wss