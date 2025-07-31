class MyRedisClient {
    constructor() {
        this.subscribers = new Map()
    }
    subscribe(channel, cb) {
        this.subscribers.set(channel, cb)
    }

    publish(channel, message) {
        const cb = this.subscribers.get(channel)
        cb(message)
    }

    unsubscribe(channel) {
        this.subscribers.delete(channel)
    }
}

export default MyRedisClient