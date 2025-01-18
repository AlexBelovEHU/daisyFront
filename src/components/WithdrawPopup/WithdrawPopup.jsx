import React, { useState } from "react";
import styles from "./WithdrawPopup.module.css";
import cross from "../../assets/close_button-removebg-preview.png";
import { withdrawalReq } from "../../redux/actions/withdrawalRequest";
import { useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';

function DepositPopup({ togglePopup, openSRP,balance }) {
  const { t } = useTranslation();
  
  const initialInputsState = {
    amount: "20",
    coin: "USDT",
    cryptoNetwork: "TRC20",
    address: "",
  };

  const [inputs, setInputs] = useState(initialInputsState);
  const [error, setError] = useState("");
  const [notEnough, setNotEnough] = useState(false)
  const dispatch = useDispatch();
  const coinOptions = ['USDT'] //["TRC20", "ERC20", "BTC", "Bitcoin", "Eth", "Lit"];
  const cryptoNetworkOptions =['TRC20'] //["Ethereum", "Bitcoin", "Litecoin"];

  const handleInputsChange = (event) => {
    const { name, value } = event.target;
    console.log(inputs);
    setInputs((prevInputsState) => ({
      ...prevInputsState,
      [name]: value,
    }));

    // Validation logic for depositAmount
    console.log(value,name)
    if (name === "amount") {
      if (value < 20 && value !== "") {
        setError("Minimum 20 USD");
        setNotEnough(true);
      }
      else if (value > balance && value !== "") {
        setError("Not enough balance");
        setNotEnough(true);
       }
      else {
        setError("");
        setNotEnough(false);
      }
    }
  };

  const handleRequestSend = () => {
    if (error !== "") {
      return;
    }
    dispatch(withdrawalReq(9, "cash_out", inputs)).then((data) => {
      if (data.status === 200) {
        setInputs(initialInputsState);
        openSRP()
        togglePopup()
      }
    });
  };

  return (
    <div className={styles.popup}>
      <div className={styles.popupinner}>
        <h1 id={styles.label}>{t("wp.withdraw")}</h1>
        <button onClick={togglePopup} className={styles.closebutton}>
          <img
            style={{ height: "20px", width: "20px" }}
            alt="x"
            src={cross}
          ></img>
        </button>

        <div style={{ textAlign: "start" }}>
          <p style={{ margin: 0, marginTop: 10 }}>{t("wp.amount")}</p>
        </div>
        <div className={styles.depositinput}>
          <input id={notEnough?(styles.err):('')}
            style={{ width: "100%", paddingLeft: "20px", padding: "15px" }}
            placeholder=""
            type="number"
            name="amount"
            value={inputs.amount}
            onChange={handleInputsChange}
          />
        </div>
        {error && <span className={styles.depositError}>{error}</span>}

        <div style={{ textAlign: "start" }}>
          <p style={{ margin: 0, marginTop: 10 }}>{t("wp.coin")}</p>
        </div>
        <div className={styles.depositinput}>
          <select
            style={{ width: "100%", paddingLeft: "20px", padding: "15px" }}
            placeholder=""
            name="coin"
            value={inputs.coin || ""}
            onChange={handleInputsChange}
          >
            <option value="" disabled></option>
            {coinOptions.map((coin, index) => (
              <option key={index} value={coin}>
                {coin}
              </option>
            ))}
          </select>
        </div>

        <div style={{ textAlign: "start" }}>
          <p style={{ margin: 0, marginTop: 10 }}>{t('wp.network')}</p>
        </div>
        <div className={styles.depositinput}>
          <select
            style={{ width: "100%", paddingLeft: "20px", padding: "15px" }}
            placeholder=""
            name="cryptoNetwork"
            value={inputs.cryptoNetwork}
            onChange={handleInputsChange}
          >
            <option value="" disabled></option>
            {cryptoNetworkOptions.map((coin, index) => (
              <option key={index} value={coin}>
                {coin}
              </option>
            ))}
          </select>
        </div>

        <div style={{ textAlign: "start" }}>
          <p style={{ margin: 0, marginTop: 10 }}>{t("wp.adress")}</p>
        </div>
        <div className={styles.depositinput}>
          <input
            style={{ width: "100%", paddingLeft: "20px", padding: "15px" }}
            placeholder=""
            type="text"
            name="address"
            value={inputs.address}
            onChange={handleInputsChange}
          />
        </div>

        <div id={styles.warning}>
          <p className={styles.warningtext}>
            {t("wp.warning")}
          </p>
        </div>

        <button
          disabled={notEnough}
          className={styles.submitbutton}
          onClick={() => {
            handleRequestSend();
          }}
        >
          {t('wp.complete')}
        </button>
      </div>
    </div>
  );
}

export default DepositPopup;
