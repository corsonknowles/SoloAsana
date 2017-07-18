import React from 'react';
import { Link } from 'react-router-dom';

const Greeting = ({currentUser, logout}) => {

  let page;
  if (currentUser) {
    page = (
    <div>
      { currentUser.username }
       <button className="header-button" onClick={logout}>Log Out</button>
    </div>
  )} else {
    page = (
    <div>
      <Link to='/signup'>Sign Up</Link>
      <br />
      <Link to='/login'>Sign Up</Link>
    </div>
    )
  }
  return page;
}


export default Greeting;
