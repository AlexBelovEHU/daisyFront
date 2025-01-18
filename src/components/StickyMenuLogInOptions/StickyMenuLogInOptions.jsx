import React from 'react';
import styles from './StickyMenuLogInOptions.module.css';
import googlebutton from '../../assets/googlebutton.png'


const StickyMenuNotLoggedIn = ({ logIn, signUp,googleLogin }) => {
  return (
    <div style={{display:'none'}} className={styles.stickymenu}>
      <div id={styles.signuptoday}><b>Sign Up</b> today and you get your luxury product next week!</div>
      <div id={styles.options}>
        <button onClick={signUp} id={styles.signupbutton}>Sign Up</button>
        <button onClick={logIn} id={styles.loginbutton}>Log In</button>
        <button onClick={googleLogin} id={styles.signupgooglebutton}><img alt="Google" src={googlebutton}></img></button>
      </div>
      <p id={styles.tandc}>By completing registration I agree with Anboxme T&c</p>
    </div>
  );
};

export default StickyMenuNotLoggedIn;
