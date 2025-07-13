const fastify = require("fastify");
const diContainer = require("./di/container");
const userRoutes = require("./routes/user.route");

const server = () => {    
    const app = fastify({logger: true});

    // Manual Dependency Injection container
    // now anywhere in our app we can inject dependencies through fastify.diContainer
    app.decorate("diContainer", diContainer);

    app.register(userRoutes);

    return app;
}

module.exports = server;