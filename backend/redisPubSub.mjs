import { createClient } from "redis";
import WSS from "./constants/WebSocket.Constant.mjs";
import { clients } from "./webSocket.mjs";

const publisher = createClient();
const subscriber = createClient();

await publisher.connect();
await subscriber.connect();


subscriber.subscribe(WSS.CHANNELS.NOTICE_BROADCAST, message => {
    const { type, notice } = JSON.parse(message)

    for (const [ws, meta] of clients.entries()) {
        const { orgIds } = meta
        if (ws.readyState !== ws.OPEN) {
            continue
        }
        if (!orgIds.includes(notice.orgId.toString())) {
            continue
        }
        ws.send(JSON.stringify({
            type,
            notice 
        }))
    }
})

const redisClients = {
    publisher,
    subscriber
}

export default redisClients