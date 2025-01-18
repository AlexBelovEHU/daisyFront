import React, { useState } from 'react';
import './SignUpPopupMobile.css';
import cross from '../../assets/close_button-removebg-preview.png';
import google from '../../assets/Google.png';
import facebook from "../../assets/Facebook.png";
import steam from "../../assets/Steam.png";


function SignUpPopupMobile({ closePopup }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const buttonclicktest = () => {
    alert('You have just clicked on a button without an assigned action. Please assign an OnClick event to this button.')
  }

  const handleLogin = () => {
    alert(`Username: ${username}, Email: ${email} Password: ${password}`);
    closePopup();
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <button onClick={closePopup} className='close-button'><img style={{ height: "20px", width: "20px" }} alt='x' src={cross}></img></button>
        <div className="choose-login-signup">
          <a style={{ fontWeight: "bold" }} href='google.com'>Sign Up</a>
          <p style={{ display: 'inline' }}>Login</p>
        </div>

        <div className='login-other-options'>
          <button onClick={buttonclicktest} className='login-option'><img src={google}></img></button>
          <button onClick={buttonclicktest} className='login-option'><img src={facebook}></img></button>
          <button onClick={buttonclicktest} className='login-option' ><img src={steam}></img></button>
        </div>
        <div
          className='username-input'>
          <input style={{ width: "100%", paddingLeft: "20px", padding: "15px" }}
            placeholder='Username*'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /></div>

        <div
          className='email-input'>
          <input style={{ width: "100%", paddingLeft: "20px", padding: "15px" }}
            placeholder='Email*'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /></div>

        <div className='password-input' >
          <input style={{ width: "100%", paddingLeft: "20px", padding: "15px" }}
            placeholder='Password*'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

          /></div>
        <div style={{ display: "flex", marginTop: "5px", marginBottom: "30px" }}><a id='termsandconditionsagreement'>By completing registration I agree with Anboxme T&c</a></div>
        <button className="submit-button" onClick={handleLogin}>Submit</button>
        <div className='footer'>
          <p style={{ margin: "10px" }}>Continue as a Guest</p>
          <p style={{ margin: "10px" }}>Already have an account?<a>Log-In</a></p>
        </div>
      </div>
    </div>
  );
}

export default SignUpPopupMobile;