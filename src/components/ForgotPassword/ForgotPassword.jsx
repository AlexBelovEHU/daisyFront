/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import styles from "./ForgotPassword.module.css";
import cross from "../../assets/close_button-removebg-preview.png";
import checkcirclepurple from '../../assets/checkcirclepurple.svg';
import { useDispatch } from "react-redux";
import { passResetPost } from "../../redux/actions/passResetAction";



function ForgotPassword({ closePopup }) {
  const initialInputsState = {email: ''};
  const [inputs, setInputs] = useState(initialInputsState);
  const dispatch = useDispatch();
  const [isSent, setIsSent] = useState(false)

  const handleInputsChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputsState) => ({
      ...prevInputsState,
      [name]: value,
    }));
  };

  const handleRequestSend = () => {
    setIsSent(true);
    dispatch(passResetPost(inputs.email));
  };

  return isSent ? (
    <div className={styles.popup}>
      <div className={styles.popupinner}>
        <p style={{ fontWeight: '400' }} id={styles.label}>Password reset successful</p>
        <p style={{ fontWeight: '400' }} id={styles.label}>Please check your inbox and spam folders. </p>
        <img src={checkcirclepurple}></img>
        <button onClick={closePopup} className={styles.closebutton}>
          <img
            style={{ height: "20px", width: "20px" }}
            alt="x"
            src={cross}
          ></img>
        </button>
      </div>
    </div>) : (
    <div className={styles.popup}>
      <div className={styles.popupinner}>
        <h1 id={styles.label}>Password recovery</h1>
        <button onClick={closePopup} className={styles.closebutton}>
          <img
            style={{ height: "20px", width: "20px" }}
            alt="x"
            src={cross}
          ></img>
        </button>

        <div className={styles.depositinput}>
          <input
            style={{ width: "100%", paddingLeft: "20px", padding: "15px" }}
            placeholder="Enter email"
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleInputsChange}
          />
        </div>
        <button
          className={styles.submitbutton}
          onClick={() => {
            handleRequestSend();
          }}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default ForgotPassword;
