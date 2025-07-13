const fastify = require("fastify");
const di = require("./di/container");
const userRoutes = require("./routes/user.route");

const server = () => {    
    const app = fastify({logger: true});

    di(app);

    app.register(userRoutes);

    return app;
}

module.exports = server;