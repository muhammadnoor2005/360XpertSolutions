const amqp = require("amqplib");

const URL = "amqp://localhost";


const connect = async() => {
    const connection = await amqp.connect(URL);
    const channel = await connection.createChannel();

    return {connection, channel};
};

module.exports = connect;
