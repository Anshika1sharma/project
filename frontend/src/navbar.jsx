import React from 'react';

const Navbar = ({ onSignUpClick, onSignInClick }) => {
  return (
    <nav>
      <div className="navigation-bar">
        <div className="navigation-buttons">
          <button onClick={onSignUpClick}>Sign Up</button>
          <button onClick={onSignInClick}>Sign In</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
