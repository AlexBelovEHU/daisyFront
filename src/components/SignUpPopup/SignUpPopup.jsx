/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import "./SignUpPopup.css";
import cross from "../../assets/close_button-removebg-preview.png";
import googleIcon from '../../assets/googleIcon.png'
import divider from '../../assets/divider.svg'
import { useTranslation } from 'react-i18next';

function SignUpPopup({ closePopup, handleSignUp, openLoginPopup, isError, handleLoginGoogle }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isEmailError, setIEE] = useState(false)

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }


  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIEE(!isValidEmail(value))
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <button onClick={closePopup} className="close-button">
          <img
            style={{ height: "20px", width: "20px" }}
            alt="x"
            src={cross}
          ></img>
        </button>
        <div
          style={{ margin: "15px", scale: "80%" }}
        ></div>
        <div className="choose-login-signup">
          <div style={{ color: "blue", width: '50%', borderBottom: '2px solid blue', textAlign: "center", padding: '10px' }}>{t("sp.signup")}</div>
          <div
            style={{ width: '50%', textAlign: "center", padding: '10px', color: 'gray' }}

            onClick={openLoginPopup}
          >
            {t("sp.login")}
          </div>
        </div>



        <div className="login-other-options">
          <button onClick={handleLoginGoogle} className="login-option">
            <div style={{ display: "flex", alignItems: "center", justifyContent: 'center' }}>
              <img style={{ width: 22, height: 21 }} src={googleIcon}></img>
              <p>{t("sp.logingoogle")}</p>
            </div>
          </button>
        </div>
        <img src={divider}></img>
        <div className="email-input">
          <input
            style={{ width: "100%", paddingLeft: "20px", padding: "15px" }}
            placeholder={t("sp.email")}
            type="text"
            value={email}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="password-input">
          <input
            style={{ width: "100%", paddingLeft: "20px", padding: "15px" }}
            placeholder={t('sp.password')}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {isEmailError ? (<p style={{ color: 'red' }}>{t("sp.invalidemail")}</p>) : (<></>)}
        {isError ? (<p style={{ color: 'red' }}>{t("sp.usernameinuse")}</p>) : (<></>)}


        <button
          className="submit-button"
          disabled={isEmailError}
          onClick={() => handleSignUp(email, password)}
        >
          {t("sp.submit")}
        </button>
        <div className="footer">
          <div style={{ textAlign: 'end', margin: '10px' }}><p style={{ fontSize: '13px' }}> </p></div>

          <p style={{ fontSize: '10px' }}>
            {t("sp.bycompleting")} <a style={{ padding: '0px' }} href="/termsandconditions"> {t("sp.tnc")}</a> {t("sp.ofthewebsite")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpPopup;
