import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ GoogleSignOut, isAuth }) => {
  return (
    <nav>
      <Link to='/'>Home</Link>
      {!isAuth && <Link to='/login'>Login</Link>}
      {isAuth && (
        <>
          <Link to='/about'>About</Link>
          <Link to='/contact'>Contact</Link>
          <Link to='/create-form'>Create Form</Link>
          <button className="login-btn" onClick={GoogleSignOut}>Sign Out</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
