const UserRepository = require("../repositories/user.repository");
const UserService = require("../services/user.service");


const di = (app) => {
    const diContainer = {
        userRepository: new UserRepository(),
    };

    diContainer.userService = new UserService(diContainer.userRepository);

    // Manual Dependency Injection container
    // now anywhere in our app we can inject dependencies through fastify.diContainer
    app.decorate("diContainer", diContainer);
}

module.exports = di;