const fastify = require('fastify')({ logger: true });
const userRoutes = require('./routes/user.routes');
const prismaPlugin = require('./plugins/prisma');

fastify.register(prismaPlugin);
fastify.register(userRoutes, { prefix: '/users' });

fastify.get("/",(req, rep) =>{
    rep.send("hello");
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });

  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();