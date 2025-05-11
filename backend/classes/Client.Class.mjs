class Client {
    constructor(client, metaData) {
        this.client = client
        this.meta = metaData
    }
    SendEvent(data) {
        throw new Error('Interface method!')
    }
}

class WebSocketClient extends Client {
    SendEvent(data) {
        console.info('Sending event through web socket...')
        const ws = this.client
        if (ws.readyState !== ws.OPEN) {
            return
        }
        ws.send(JSON.stringify(data))
        console.info('Sent event through web socket...')
    }
}


class ServerSentClient extends Client {
    constructor(client, metaData, eventType = 'message') {
        super(client, metaData)
        this.eventType = eventType
    }
    SendEvent(data) {
        console.info('Sending event through server sent...', data)
        const res = this.client
        res.write(`event: ${this.eventType}\ndata: ${JSON.stringify(data)}\n\n`)
        console.info('Sent event through server sent!')
    }
}

const ClientClasses = {
    WebSocketClient,
    ServerSentClient
}

export default ClientClasses