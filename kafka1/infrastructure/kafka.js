const {Kafka} = require("kafkajs");

// initilize kafka; connects your application to the Kafka cluster
// Acts as a connection manager to Kafka.
const kafka = new Kafka({
    clientId: "producer-app",
    brokers:["localhost:9092"]
});

module.exports = kafka;

