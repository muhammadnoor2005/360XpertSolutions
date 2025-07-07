const { Environment } = require("rabbitmq-stream-js-client");

const streamExample = async () => {
    const env = await Environment.create({
        host:"localhost",
        port: 5552,
        user:"guest",
        password: "guest"
    });

    await env.streams.createStream("myStream", {
        maxLengthBytes: 10_000_000,
    });

    const producer = await env.producers.createProducer({stream:"myStream"});
    await producer.send(Buffer.from("hello from stream"));

    const consumer = await env.consumers.createConsumer(
        { stream: "myStream", offset:"first"},
        msg => {
            console.log("streamMsg:", msg.payload.toString());
        }
    );
};

module.exports = streamExample;