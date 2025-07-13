class UserRepository{
    constructor(){
        this.users = [
            { id: 1, name: 'Noor'},
            { id: 2, name: 'Noor2'}
        ];
    }

    async findAll(){
        return this.users;
    }

    async findById(id){
        return this.users.find(user => user.id === parseInt(id));
    }
}

module.exports = UserRepository;