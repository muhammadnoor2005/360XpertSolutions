const users = [];

// join user chat
const userJoin = (id, username, room) => {
    const user = {id, username, room};

    users.push(user);

    return user;
} 

// get curr user
const getCurrUser = (id) => {
    return users.find(u => u.id === id);
}

// user leave chat
const userLeave = (id) => {   
    const index = users.findIndex(u => u.id === id);

    if(index !== -1){
        return users.splice(index,1)[0];
    }
}


// get room users
const getRoomUsers = (room) => {
    return users.filter(user => user.room === room);
}
module.exports = {userJoin,getCurrUser,userLeave,getRoomUsers};