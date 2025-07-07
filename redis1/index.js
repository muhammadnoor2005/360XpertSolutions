const express = require("express");
const app = express();

const redis = require("redis");
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();


// redis connection
const client = redis.createClient({
  socket: {
    host: 'redis',  // matches Docker Compose service name
    port: 6379
  }
});

// start redis connection
client.connect().catch(console.error);

app.get("/products", async(req, res) => {
    try {
        const cacheKey = "product:all";
        const cachedData = await client.get(cacheKey);

        if(cachedData){
            console.log("loaded from cache");
            return res.json(JSON.parse(cachedData));
        }

        console.log("loaded from db");


        const data = await prisma.product.findMany();
        await client.setEx(cacheKey, 60, JSON.stringify(data));

        res.json(data);
    } catch (err) {
        res.status(404).send(err.message);
    }
})


const port = 3000;

app.listen(port, () =>{
    console.log("server started on port: ", port);
})