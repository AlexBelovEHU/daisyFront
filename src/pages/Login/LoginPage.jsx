import React, { useState } from "react";
import {  useSelector } from "react-redux";
import LoginPopup from '../../components/LoginPopup/LoginPopup';

function LoginPage() {
  const loading = useSelector((state) => state.example.loading);
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  return (
    <div className="content-component__wrapper">
      {loading ? (
        <div> Загрузка...</div>
      ) : (
        <div className="App">
          <button onClick={togglePopup}>Login</button>
          {showPopup && <LoginPopup closePopup={togglePopup} />}
        </div>
      )}
    </div>  
  );
}

export default LoginPage;