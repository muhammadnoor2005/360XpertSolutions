const kafka = require("../infrastructure/kafka");

const producer = kafka.producer();

const run = async() => {
    await producer.connect();

    const messages = [
        { key: '1', value: JSON.stringify({ orderId: 1, item: 'Shirt' }) },
        { key: '2', value: 'INVALID_JSON' }, // Simulate failure
        { key: '3', value: JSON.stringify({ orderId: 3, item: 'Shoes' }) },
    ];

    await producer.send({
        topic: "orders",
        messages
    });

    console.log("sent");
    await producer.disconnect();
};

run().catch(console.error);
