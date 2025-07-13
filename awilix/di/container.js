const {createContainer, asClass, asValue} = require("awilix");

const UserRepository = require("../repositories/user.repository");
const UserService = require("../services/user.service");

const container = createContainer();

// container.register({
//     config:asValue({
//         apiPrefix: "/api",
//         port:3000
//     })
// })
 
//seprate for easy maintenance and better orgnization
//servcies
container.register({
    userService: asClass(UserService),
})

//repositories
container.register({
    userRepository: asClass(UserRepository)
});

module.exports = container;