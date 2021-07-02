import React from 'react';
import './InfoBar.css';
import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';

//Full page refresh at the a href -> clean the socket that is disconnected in chat.js
//Infobar -> display the name of that room below
const InfoBar = ({ room }) => (
  <div className='infoBar'>
    <div className='leftInnerContainer'>
      <img className='onlineIcon' src={onlineIcon} alt='online' />
      <h3>{room} </h3>
    </div>
    <div className='rightInnerContainer'>
      <a href='/'>
        <img src={closeIcon} alt='close' />
      </a>
    </div>
  </div>
);
export default InfoBar;
