import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Join.css';
import ProjectInfo from '../ProjectInfo/ProjectInfo';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className='joinOuterContainer'>
      <div className='joinInnerContainer'>
        <h1 className='heading'>Join</h1>
        {/* two hooks for the name/room data */}
        {/* Event occurs when users type something in this input and grab data from it */}
        <div>
          <input
            placeholder='Name'
            className='joinInput'
            type='text'
            // Holds data and then set the output of this input to the corresponding variable.
            onChange={(event) => setName(event.target.value)}
          />{' '}
        </div>
        <div>
          <input
            placeholder='Room'
            className='joinInput mt-20'
            type='text'
            // event.target -> clicked on -> returns a string
            onChange={(event) => setRoom(event.target.value)}
          />{' '}
        </div>{' '}
        {/* 
        // Pass parameters into the url using ? and pass in variables name and room, 
        & divides name and room.
                
        // The onClick part -> callBack function. event -> prevents the user from clicking the link
          if they did not provide both parameters needed.
          If there is a room and name -> do nothing
            */}
        <Link
          onClick={(event) => (!name || !room ? event.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className='button mt-20' type='submit'>
            Sign In
          </button>{' '}
          {/*Sign in button*/}
        </Link>
      </div>
      <ProjectInfo />
    </div>
  );
};

export default Join;
