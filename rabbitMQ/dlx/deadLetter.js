// const connect = require("../utils/connect");

// const exchange = "dlx.exchange";
// const dlxQueue = "dlx.queue";
// const mainQueue = "main.queue";

// const dlxExchange = async () => {
//     const { channel } = await connect();

//     await channel.assertExchange(exchange, "fanout", {durable:true});
//     await channel.assertQueue(dlxQueue, {durable:true});
//     await channel.bindQueue(dlxQueue, exchange, '');

//     // main queue with dlx
//     await channel.assertQueue(mainQueue, {
//         durable: true,
//         deadLetterExchange: exchange
//     });

//     // send message that will be rejected
//     channel.sendToQueue(mainQueue, Buffer.from('Reject me'));

    
//     // Reject the message to send it to DLX
//     channel.consume(mainQueue, msg => {
//         if(msg){
//             console.log("rejecting message");
//             channel.reject(msg, false); //false = dont requeue(fail)
//         }
//     });

//     // read from dlx queue
//     channel.consume(dlxQueue, msg => {
//         if(msg) {
//             console.log("dlx recieved: ", msg.content.toString());
//             channel.ack(msg);
//         };
//     });
// };

// module.exports = dlxExchange;




const connect = require("../utils/connect");

const dlxQueue = "dlx.queue";
const mainQueue = "main.queue";
const dlxExchange = "dlx.exchange";

const deadLetterExchange = async () => {
    const {channel} = await connect();

    await channel.assertExchange(dlxExchange, "fanout", {durable:true});
    await channel.assertQueue(dlxQueue,{durable:true});
    await channel.bindQueue(dlxQueue, dlxExchange, '');

    await channel.assertQueue(mainQueue,{
        durable:true,
        deadLetterExchange: dlxExchange
    });

    channel.sendToQueue(mainQueue, Buffer.from("reject me"));

    channel.consume(mainQueue, msg => {
        if(msg){
            channel.reject(msg, false);
        }
    });

    channel.consume(dlxQueue, msg => {
        if(msg){
            console.log(msg.content.toString);
        }
    })
}