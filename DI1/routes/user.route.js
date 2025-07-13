

const getAllUsers = async(fastify, opt) => {
    //here userService = new UserServce()
    const userService = fastify.diContainer.userService;

    fastify.get("/users", async(request, reply) => {
        const users = userService.listUsers();
        return users;
    })
};

module.exports = getAllUsers;