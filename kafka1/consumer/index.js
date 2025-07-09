const kafka = require("../infrastructure/kafka");

const consumer = kafka.consumer({groupId: "order-group"});
const dltProducer = kafka.producer(); //for dead letter topic

const run = async() => {
    await consumer.connect();
    await dltProducer.connect();
    await consumer.subscribe({
        topic:"orders",
        fromBeginning: true // ead from the start(offset zero); when false it read from where it left
    });

    consumer.run({
        eachMessage: async({topic, partition, message}) => {
            const value = message.value.toString();

            try {
                const data = JSON.parse(value);
                console.log("processed!", data);
            } catch (err) {
                console.log("fail to process");

                await dltProducer.send({
                topic:"orders.DLT",
                messages:[
                    {
                        key:message.key?.toString(),
                        value:JSON.stringify({
                            originalValue:value,
                            error:err.message,
                            timestamp: new Date().toISOString()
                        })
                    }
                ]
            })
            }

           
        }
    })

    // await consumer.disconnect();
};

run().catch(console.error);