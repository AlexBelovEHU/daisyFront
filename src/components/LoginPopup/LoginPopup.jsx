/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import "./LoginPopup.css";
import cross from "../../assets/close_button-removebg-preview.png";
import googleIcon from "../../assets/googleIcon.png";
import ForgotPassword from '../ForgotPassword/ForgotPassword'
import divider from '../../assets/divider.svg'
import { useTranslation } from 'react-i18next';


function LoginPopup({
  closePopup,
  handleLogin,
  handleLoginGoogle,
  openSignPopup,
  isError,
}) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false)

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin(email, password);
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [email, password]);

  return (showForgotPassword ? (
    <ForgotPassword closePopup={() => { setShowForgotPassword(false);closePopup() }}></ForgotPassword>
    ) : (


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
          <div
            style={{ width: '50%', textAlign: "center", padding: '10px', color: 'gray' }}
            onClick={openSignPopup}
          >
            {t("lp.signup")}
          </div>
          <div
            style={{ color: "blue", width: '50%', borderBottom: '2px solid blue', textAlign: "center", padding: '10px' }}
          >
            {t("lp.login")}
          </div>
        </div>


        <div className="login-other-options">
          <button onClick={handleLoginGoogle} className="login-option">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img style={{ width: 22, height: 21 }} src={googleIcon}></img>
              <p>{t("lp.logingoogle")}</p>
            </div>
          </button>
        </div>
        <img src={divider}></img>
        <div className="email-input">
          <input
            style={{ width: "100%", paddingLeft: "20px", padding: "15px" }}
            placeholder={t('lp.email')}
            type="email"
            value={email}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="password-input">
          <input
            style={{ width: "100%", paddingLeft: "20px", padding: "15px" }}
            placeholder={t("lp.password")}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {isEmailError ? (<p style={{ color: 'red' }}>{t("lp.invalidemail")}</p>) : (<></>)}
        {isError ? (<p style={{ color: 'red' }}>{t("lp.invalidpassword")}</p>) : (<></>)}




        <button
          disabled={isEmailError}
          className="submit-button"
          onClick={() => handleLogin(email, password)}
        >
          {t("lp.submit")}
        </button>
        <div className="footer">
          <div style={{ textAlign: 'end', margin: '10px 0px 10px' }}><p style={{ fontSize: '13px' }}>{t("lp.forgotpassword")}<a onClick={() => { setShowForgotPassword(true) }}>{t("lp.clickhere")}</a></p></div>
          <p style={{ fontSize: '10px' }}>
            {t("lp.bycompleting")} <a style={{ padding: '0px' }} href="/termsandconditions"> {t("lp.tnc")}</a> {t("lp.ofthewebsite")}
          </p>
        </div>
      </div>
    </div>
    )
  );
}

export default LoginPopup;
