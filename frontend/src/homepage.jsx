import React, { useState } from 'react';
import Navbar from './navbar';
import SignupPage from './signup';
import SigninPage from './signin';
import "./App.css";

const Homepage = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showSignin, setShowSignin] = useState(false);

  const handleSignUpClick = () => {
    setShowSignup(true);
    setShowSignin(false);
  };

  const handleSignInClick = () => {
    setShowSignup(false);
    setShowSignin(true);
  };

  const handleHideForms = () => {
    setShowSignup(false);
    setShowSignin(false);
  };

  return (
    <div className="app">
      <Navbar onSignUpClick={handleSignUpClick} onSignInClick={handleSignInClick} />
      {showSignup && (
        <SignupPage onSignInClick={handleSignInClick} onHide={handleHideForms} />
      )}
      {showSignin && (
        <SigninPage onSignUpClick={handleSignUpClick} onHide={handleHideForms} />
      )}
    </div>
  );
};

export default Homepage;


