const userRoutes = (fastify, opts) => {

    //cradle: Automatically created by Awilix when you call createContainer() and Available on any container or container scope instance
    // It's the main interface for getting your registered dependencies from the container
    const { userService } = fastify.diContainer.cradle;

    fastify.get("/",  async(request, reply) => {
        const users = await userService.getUsers();
        return users;
    });

    fastify.get("/:id", async(request, reply) => {
        try {
            const {id} = request.params;
            const user = await userService.getUser(id);

            return user;
        } catch (err) {
            reply.code(404).send({message: err.message})
        }
    })
}   

module.exports = userRoutes;