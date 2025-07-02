

async function userRoutes(fastify, options) {
    const prisma = fastify.prisma;
    // add user
    fastify.post("/", async (req, rep) => {
        const {name, email, age} = req.body;
        const user = await prisma.users.create({
            data:{name, email, age}
        });

        return user;
    });

    // get all users
    fastify.get("/", async (req, rep) => {
        const user =  await prisma.users.findMany();
        rep.send(user);
    });

    // get a single user with id
    fastify.get("/:id", async(req,rep) => {
        const { id } = req.params;
        const user = await prisma.users.findUnique({
            where: {id : parseInt(id)}
        });

        rep.send(user);
    });

    fastify.patch("/:id", async (req, rep) => {
        const {id} = req.params;

        const {name, email, age} = req.body;
        const user = await prisma.users.update({
            where: { id: parseInt(id)},
            data:{name, email, age}
        });

        rep.send(user);
    });

    fastify.delete("/:id", async(req, rep) => {
        const {id} = req.params;
        const users = await prisma.users.delete({
            where: {id : parseInt(id)}
        });

        rep.send(users);
    })
}

module.exports = userRoutes;