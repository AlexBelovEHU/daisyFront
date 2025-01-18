/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import styles from './OpenBoxPopup.module.css'
import { useEffect } from 'react';


const OpenBoxPopup = ({ onOpen, closePopup, isPlayerBroke }) => {
  useEffect(() => {
    if (isPlayerBroke) {
      onOpen()
    }
    else {
      window.scroll({ top: 0, behavior: "smooth" });
      const timeoutId = setTimeout(() => {
        onOpen()
      }, 4000);

      // Cleanup the timeout on component unmount
      return () => clearTimeout(timeoutId);
    }
  }, []);

  return (
    isPlayerBroke ? (<></>) : (
      <div className='popup'>
        <div className={styles.stickymenu}>
          <p id={styles.Boxis}>Box is opening now!</p>
          {isPlayerBroke ? (
            <div id="erroraccountexists">
              <p style={{ color: "black" }}>Not enough balance</p>
            </div>
          ) :
            (<></>)}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={closePopup} id={styles.cancel}>Cancel</button>
            <button onClick={onOpen} id={styles.confirm}>Confirm</button>
          </div>
        </div>
      </div>
    )


  );
};

export default OpenBoxPopup;
