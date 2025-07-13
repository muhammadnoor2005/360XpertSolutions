const server = require("./app");
const app = server();

app.listen({port:3000}, (err) => {
    if(err){
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at http://localhost:3000');
})
