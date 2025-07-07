const connect = require("../utils/connect");

const exchange = "directExchange";
const queue = "infoQueue";

const directExchange = async() => {
    const { channel } = await connect();

    await channel.assertExchange(exchange, "direct");

    await channel.assertQueue(queue);
    await channel.bindQueue(queue, exchange, "info");

    channel.publish(exchange, "info", Buffer.from("info log message"));

    channel.consume(queue, msg => {
        console.log("direct exchange reciveed", msg.content.toString());
        channel.ack(msg);
    });
};

module.exports = directExchange;