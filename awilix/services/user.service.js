class UserService {
    constructor({userRepository}){
        this.userRepository = userRepository;
    }

    async getUsers(){
        return this.userRepository.findAll();
    }

    async getUser(id){
        const user = await this.userRepository.findById(id);
        if(!user){
            throw new Error("user not found");
        }

        return user;
    }
}

module.exports = UserService;