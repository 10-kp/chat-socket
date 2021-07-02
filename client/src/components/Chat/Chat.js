import React, { useState, useEffect } from 'react'; //Using hooks
import queryString from 'query-string'; //retrieve data from the url
import io from 'socket.io-client';

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
    //location.search comes from react router
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    // Retrieve the data users
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
      //Add new messages to our messages array
      //"...messages"" copies the old messages and append the new
      setMessages((messages) => [...messages, message]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  }, []);

  //Functional component -> sending messages
  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      // Clears input field on callBack from index.js
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };
  console.log(message, messages);
  // Component that will display the users
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
