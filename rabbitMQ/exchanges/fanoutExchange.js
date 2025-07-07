const connect = require("../utils/connect");

const exchange = "fanoutExchange";

const fanoutExchange = async() => {
    const {channel} = await connect();

    await channel.assertExchange(exchange, "fanout");
    const { queue } = await channel.assertQueue("", {exclusive:true});
    await channel.bindQueue(queue, exchange, '');

    channel.publish(exchange, "", Buffer.from("fanout message"));

    channel.consume(queue, msg => {
        console.log("fanout recieved", msg.content.toString());
        channel.ack(msg);
    });

};

module.exports = fanoutExchange;