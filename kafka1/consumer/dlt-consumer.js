const kafka = require("../infrastructure/kafka");

const consumer = kafka.consumer({groupId:"dlt-group"});

const run = async () => {
    await consumer.connect();
    
    await consumer.subscribe({
        topic:"orders.DLT",
        fromBeginning:true
    });

    await consumer.run({
        eachMessage: async({message}) => {
            const value = JSON.parse(message.value.toString());
            console.log("dl received ", value);
        }
    })

    // await consumer.disconnect();
}

run().catch(console.error);