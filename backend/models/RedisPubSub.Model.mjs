import { createClient } from "redis";
import WSS from "../constants/WebSocket.Constant.mjs";

const Publisher = createClient();
const Subscriber = createClient();


await Publisher.connect();
await Subscriber.connect();


const RedisPubSubModel = {
    SubscribeToOrg,
    PublishToOrg,
    UnsubscribeToOrg
}

export default RedisPubSubModel

const subscribedOrgIds = new Map()

async function SubscribeToOrg(orgId, clientsMap) {
    const currentCount = subscribedOrgIds.get(orgId) || 0;
    if (currentCount > 0) {
        subscribedOrgIds.set(orgId, currentCount + 1)
        return
    }
    subscribedOrgIds.set(orgId, 1)

    const channel = `${WSS.CHANNELS.NOTICE_BROADCAST}:${orgId}`;

    Subscriber.subscribe(channel, (message) => {
        const { type,  notice } = JSON.parse(message)

        for (const [ws, meta] of clientsMap.entries()) {
            const { orgIds } = meta
            if (ws.readyState !== ws.OPEN) {
                continue
            }
            if (!orgIds.includes(notice?.orgId?.toString())) {
                continue
            }
            ws.send(JSON.stringify({
                type,
                notice 
            }))
        }
    })
}

async function PublishToOrg(orgId, messageData) {
    const channel = `${WSS.CHANNELS.NOTICE_BROADCAST}:${orgId}`;

    await Publisher.publish(channel, JSON.stringify(messageData))
}

async function UnsubscribeToOrg(orgId) {
    const currentCount = subscribedOrgIds.get(orgId) || 0

    if (currentCount > 1) {
        subscribedOrgIds.set(orgId, currentCount - 1)
        return
    }
    const channel =  `${WSS.CHANNELS.NOTICE_BROADCAST}:${orgId}`;
    Subscriber.unsubscribe(channel)
    subscribedOrgIds.delete(orgId)
}