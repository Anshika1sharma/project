import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios'; 

const SignupPage = ({ onSignInClick, onHide }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dropdownValue, setDropdownValue] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [dropdownError, setDropdownError] = useState('');
    const [recaptchaValue, setRecaptchaValue] = useState(null); 
    const [submitted, setSubmitted] = useState(false);
  
    const handleRecaptchaChange = (value) => {
      setRecaptchaValue(value);
    };
  
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    const validatePassword = (password) => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return passwordRegex.test(password);
    };
  
    const handleEmailChange = (e) => {
      const value = e.target.value;
      setEmail(value);
      if (!validateEmail(value)) {
        setEmailError('Please enter a valid email address');
      } else {
        setEmailError('');
      }
    };
  
    const handlePasswordChange = (e) => {
      const value = e.target.value;
      setPassword(value);
      if (value.trim() === '') {
        setPasswordError('Please enter a password');
      } else if (!validatePassword(value)) {
        setPasswordError('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character');
      } else {
        setPasswordError('');
      }
    };
  
    const handleDropdownChange = (e) => {
      const value = e.target.value;
      setDropdownValue(value);
      if (value === '') {
        setDropdownError('Please select an option');
      } else {
        setDropdownError('');
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      let formValid = true;
  
      if (!validateEmail(email)) {
        setEmailError('Please enter a valid email address');
        formValid = false;
      }
  
      if (password.trim() === '' || !validatePassword(password)) {
        setPasswordError('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character');
        formValid = false;
      }
  
      if (dropdownValue === '') {
        setDropdownError('Please select an option');
        formValid = false;
      }
  
      if (formValid) {
        try {
          const response = await axios.post('http://localhost:3000/signup', {
            email: email,
            password: password,
            dropdownValue: dropdownValue
          });
          console.log(response.data);
          setEmail('');
          setPassword('');
          setDropdownValue('');
          setSubmitted(true);
          onHide();
          alert("Signup successful");
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      }
    };
  
    const handleCaptchaSubmit = () => {
      if (!recaptchaValue) {
        console.log('Please complete the ReCAPTCHA');
        return;
      }
    };
  
    return (
      <div className="signup-page">
        <h2>Sign Up</h2>
        {!submitted && (
          <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input type="email" value={email} onChange={handleEmailChange} />
            {emailError && <p className="error">{emailError}</p>}
            <label>Password:</label>
            <input type="password" value={password} onChange={handlePasswordChange} />
            {passwordError && <p className="error">{passwordError}</p>}
            <label>Dropdown:</label>
            <select value={dropdownValue} onChange={handleDropdownChange}>
              <option value="">Select an option</option>
              <option value="Admin">Admin</option>
              <option value="Customer">Customer</option>
              <option value="Engineer">Engineer</option>
              <option value="Domain Leader">Domain Leader</option>
              <option value="IC design service provider">IC design service provider</option>
            </select>
            <ReCAPTCHA
              sitekey="6Lcp54gpAAAAAN6exs5goYq2-lUXUPAwkSZ6eJSv"
              onChange={handleRecaptchaChange}
            />
            <button type="submit" onClick={handleCaptchaSubmit}></button>
            {dropdownError && <p className="error">{dropdownError}</p>}
            <button type="submit">Submit</button>
          </form>
        )}
        <button onClick={onSignInClick}>Sign In</button>
      </div>
    );
  };
 export default SignupPage;
