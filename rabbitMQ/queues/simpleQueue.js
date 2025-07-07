const connect = require("../utils/connect");

const queue = "myQueue";

const simpleQueue = async () => {
    const { channel } = await connect();

    await channel.assertQueue(queue, {durable: true});

    channel.sendToQueue(queue, Buffer.from("hello from simpleQueue"));

    channel.consume(queue, msg => {
        console.log("simple queue received", msg.content.toString());
        channel.ack(msg);
    });
};

module.exports = simpleQueue;
