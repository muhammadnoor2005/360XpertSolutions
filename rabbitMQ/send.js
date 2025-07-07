const amqp = require("amqplib/callback_api");

// connect to rabbitmq server
// creating channel, where most of api for getting things resides
amqp.connect("amqp://localhost", (err0, connection) => {
    if(err0){
        throw err0;
    }

    // creating queue for us to send to 
    connection.createChannel((err1, channel) => {
        if(err1){
            throw err1;
        }

        const queue = "hello";
        const msg = "hello world";

        channel.assertQueue(queue,{
            durable:false
        })

        channel.sendToQueue(queue, Buffer.from(msg));
        console.log("send %s", msg);
    });

    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500);
}); 


