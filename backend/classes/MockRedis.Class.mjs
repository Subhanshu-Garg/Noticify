import { EventEmitter } from 'events';

class MyRedisClient extends EventEmitter {
    // A private, static event emitter acts as the central bus.
    // It's 'static' so it's shared across ALL instances of MyRedisClient.
    // This is how the publisher instance can talk to the subscriber instance.
    static #pubSubBus = new EventEmitter();

    constructor() {
        // Call the EventEmitter constructor
        super();
        console.log("✅ MockRedisClient instance created.");
    }

    /**
     * Mimics the real .on() method by inheriting from EventEmitter.
     * Used for listening to 'error' events.
     */
    // .on() is inherited from EventEmitter, no need to write it.

    /**
     * Mock of the connect method. It resolves immediately.
     */
    async connect() {
        // In the mock, we don't need to do anything, just return a resolved promise.
        return;
    }

    /**
     * Mock of the publish method.
     * It emits an event on the shared, static event bus.
     * @param {string} channel - The channel to publish to.
     * @param {string} message - The message to send.
     */
    async publish(channel, message) {
        console.log(`[MOCK PUBLISH] Channel: "${channel}" | Message: ${message}`);
        // Emit an event on our shared bus. The subscriber will be listening for this.
        MyRedisClient.#pubSubBus.emit(channel, message);
    }

    /**
     * Mock of the subscribe method.
     * It listens for an event on the shared, static event bus.
     * @param {string} channel - The channel to subscribe to.
     * @param {function} listener - The callback function to execute with the message.
     */
    async subscribe(channel, listener) {
        console.log(`[MOCK SUBSCRIBE] Channel: "${channel}"`);
        // Listen for an event on our shared bus.
        MyRedisClient.#pubSubBus.on(channel, listener);
    }

    /**
     * Mock of the unsubscribe method.
     * @param {string} channel - The channel to unsubscribe from.
     */
    async unsubscribe(channel) {
        console.log(`[MOCK UNSUBSCRIBE] Channel: "${channel}"`);
        // Stop listening for this event on the shared bus.
        MyRedisClient.#pubSubBus.removeAllListeners(channel);
    }
}

export default MyRedisClient;