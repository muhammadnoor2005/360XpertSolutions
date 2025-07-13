const UserRepository = require("../repositories/user.repository");
const UserService = require("../services/user.service");

const diContainer = {
    userRepository: new UserRepository(),
};

diContainer.userService = new UserService(diContainer.userRepository);


module.exports = diContainer;