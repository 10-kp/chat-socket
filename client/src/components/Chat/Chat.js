import React, { useState, useEffect } from 'react'; //Coz we are using hooks
import queryString from 'query-string'; //retrieve data from the url
import io from 'socket.io-client'; //require io

import './Chat.css';

import Input from '../Input/Input';
import InfoBar from '../InfoBar/InfoBar';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

let socket;

// Creating the chat
const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // To confirm if it is working
  const ENDPOINT = 'https://react-chat-app-project.herokuapp.com/';

  // Runs when the component renders
  useEffect(() => {
    const { name, room } = queryString.parse(location.search); //location.search comes from react router

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    //  Retrieve the data users
    // Emit -> pass in a string that the backend recognizes
    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  //Handeling messages and only runs when messages array changes
  useEffect(() => {
    socket.on('message', (message) => {
      //add new messages to our messages array the
      setMessages((messages) => [...messages, message]); //"...messages"" copies the old messages and append the new
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  }, []);

  //Functional component -> sending messages
  const sendMessage = (event) => {
    event.preventDefault(); // full browser refreshes aren't good

    if (message) {
      // Clears input field on callBack from index.js
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };
  console.log(message, messages);
  // i need another component that will display the users
  return (
    <div className='outerContainer'>
      <div className='container'>
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
