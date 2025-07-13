class UserService{
    constructor(userRepository){
        this.userRepository = userRepository;
    }

    listUsers(){
        return this.userRepository.getAllUsers();
    }
}

module.exports = UserService;