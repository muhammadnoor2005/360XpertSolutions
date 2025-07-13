const fastify = require("fastify")({logger:true});
const userRoutes = require("./routes/user.route");
const container = require("./di/container");

// add the container to Fastify instance for easy access
fastify.decorate('diContainer', container);

fastify.register(userRoutes, { prefix: "/api/users" });

const start = async() => {
    try {
        // const {config} = container.cradle;

        await fastify.listen({ port: 3000 });
        // console.log(`Server running on http://localhost:${config.port}`);
        console.log("server on port " + 3000)
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

start();
