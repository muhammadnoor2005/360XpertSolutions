const connect = require("../utils/connect");

const exchange = "topicExchange";

const topicExchange = async() => {
    const { channel } = await connect();

    await channel.assertExchange(exchange, "topic");
    const {queue} = await channel.assertQueue('', {exclusive:true});

    await channel.bindQueue(queue, exchange, "user.*");

    channel.publish(exchange, 'user.created', Buffer.from("user created"));

    channel.consume(queue, msg => {
        console.log("topic exchange", msg.fields.routingKey, msg.content.toString());
        channel.ack(msg);
    });
};

module.exports = topicExchange;