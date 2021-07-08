const users = [];

//addUser function takes three parameters, id of a socket instance
const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  //Check if new user is trying to signup for the same room with the same user name -> not allowed
  //Check by going through the user array
  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  //If user already exists, return error
  if (existingUser) {
    return { error: 'Username is taken' };
  }
  //Make user and add to the users' array
  const user = { id, name, room };
  users.push(user);

  //Return the user so we know which one was pushed
  return { user };
};
//function to remove user, only takes in a single parameter
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id); //checks to see if there is a user with that id passed in
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};
//if the user exists, we return it
const getUser = (id) => users.find((user) => user.id === id);

//.filter -> new array with all elements
//Return an array with all the users in the room
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
