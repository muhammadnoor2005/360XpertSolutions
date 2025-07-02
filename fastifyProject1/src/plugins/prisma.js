const fp = require("fastify-plugin");
const {PrismaClient} = require("@prisma/client");

async function prismaPlugin(fastify,options) {
    const prisma = new PrismaClient();

    await prisma.$connect();

    fastify.decorate("prisma", prisma);

    fastify.addHook("onClose", async(fastify) => {
        await fastify.prisma.$disconnect()
    });
}

module.exports = fp(prismaPlugin);