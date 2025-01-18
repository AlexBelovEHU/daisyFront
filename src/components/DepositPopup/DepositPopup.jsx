/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import styles from './DepositPopup.module.css'
import cancel from '../../assets/cancel.svg';
import payfromrussiaicons from '../../assets/payfromrussiaicons.svg';
import azerbaijan from '../../assets/azerbaijan.svg';
import payfromanywhereicons from '../../assets/payfromanywhereicons.svg';
import payfromeuropeicon from '../../assets/payfromeuropeicon.svg';
import keyboardarrowright from '../../assets/keyboard_arrow_right.svg';
import keyboardarrowleft from '../../assets/keyboard_arrow_left.svg';
import kazakhastanpay from '../../assets/kazakhastanpay.svg';
import infinity from '../../assets/infinity.svg';
import { deposit } from '../../redux/actions/depositExpayAction';
import { depositlink } from '../../redux/actions/depositAction';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function DepositPopup({ togglePopup }) {
  const currencyDisplay = {
    1: 'RUB',
    3: 'KZT',
    'crypto': 'USD',
    'RUB': "RUB",
    'AZN': "AZN",
    37: "AZN"
  }
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.example.loading);
  const characters = useSelector((state) => state.example.payload);



  const presetPrices = [10, 20, 50, 100, 200]
  const [depositAmount, setDepositAmount] = useState('');
  const [step, setStep] = useState(1);
  const [currentHeader, setCurrentHeader] = useState("");
  const [isDepositing, setIsDepositing] = React.useState(false);

  const [currentCurrency, setCurrentCurrency] = useState("");
  const [currentToken, setCurrentToken] = useState("")

  const [bronze, setBronze] = useState('')
  const [silver, setSilver] = useState('')
  const [gold, setGold] = useState('')

  const startDeposit = (amount, token, currency) => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    if (token == 'crypto') {
      dispatch(depositlink(amount));

    } else {

      dispatch(deposit(amount, token, currency));
    }
    setIsDepositing(true);
  };

  if (!loading && isDepositing && characters.url != undefined) {

    localStorage.setItem('depositUrlLog', characters)
    window.location.href = characters.url;
    setIsDepositing(false);
  }



  useEffect(() => {

    const interval = setInterval(() => {
      try {
        setBronze(window.clientConfig.imageUrl + JSON.parse(localStorage.getItem('bronzeBox'))[0].image)
        setSilver(window.clientConfig.imageUrl + JSON.parse(localStorage.getItem('silverBox'))[0].image)
        setGold(window.clientConfig.imageUrl + JSON.parse(localStorage.getItem('goldBox'))[0].image)
      }
      catch { /* empty */ }
    }, 1000); // This runs every 1000ms (1 second)

    // Cleanup to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  if (!loading && isDepositing && characters.url != undefined) {

    localStorage.setItem('depositUrlLog', characters)
    window.location.href = characters.url;
    setIsDepositing(false);
  }

  var currentBonus = depositAmount > 20 ? (depositAmount > 75 ? (3) : (2)) : (1);

  const [error, setError] = useState("");
  const [notEnough, setNotEnough] = useState(false)


  const handleInputsChange = (event) => {
    const { name, value } = event.target;
    setDepositAmount(value)

    // Validation logic for depositAmount
    console.log(value, name)
    if (name === "amount") {
      if (value < 10 && value !== "") {
        setError("Minimum 10 USD");
        setNotEnough(true);
      } else {
        setError("");
        setNotEnough(false);
        //ss

      }
    }
  };
  const changeDepositAmount = (amount) => {
    setDepositAmount(amount)

    if (amount < 10) {
      setError("Minimum 10 USD");
      setNotEnough(true);
    } else {
      setError("");
      setNotEnough(false);
      //ss

    }
  }

  switch (step) {
    case 1:
      return <div className={styles.popup}>
        <div className={styles.popupinner}>
          <button onClick={togglePopup} className={styles.closebutton}><img style={{ height: "25px", width: "25px" }} alt='x' src={cancel}></img></button>
          <h1 id={styles.label}>{t("dp.russia")}</h1>

          <div onClick={() => { setCurrentToken("rubfps"); setCurrentCurrency(1); setCurrentHeader(t('dp.payfromrussia')); setStep(2) }} className={styles.option}>
            <img src={payfromrussiaicons}></img>
            <div>
              <p style={{ fontSize: '13px', fontWeight: '400px', color: 'black', whiteSpace: 'nowrap' }}>{t("dp.rubspb")}</p>
              <p style={{ fontSize: '10px', fontWeight: '400px', whiteSpace: 'nowrap' }}>1000 RUB - 300000 RUB</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
              <img src={keyboardarrowright}></img>
            </div>
          </div>

          <div style={{ height: '10px' }}></div>

          <div onClick={() => { setCurrentToken("rub"); setCurrentCurrency(1); setCurrentHeader(t('dp.payfromrussia')); setStep(2) }} className={styles.option}>
            <img src={payfromrussiaicons}></img>
            <div>
              <p style={{ fontSize: '13px', fontWeight: '400px', color: 'black', whiteSpace: 'nowrap' }}>{t("dp.rubk")}</p>
              <p style={{ fontSize: '10px', fontWeight: '400px', whiteSpace: 'nowrap' }}>1000 RUB - 300000 RUB</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
              <img src={keyboardarrowright}></img>
            </div>
          </div>

          <div style={{ height: '10px' }}></div>

          <div onClick={() => {/* setCurrentToken("CARDRUBP2P"); setCurrentCurrency('RUB'); setCurrentHeader(t('dp.payfromrussia')); setStep(2) */}} className={styles.option}>
            <img src={payfromrussiaicons}></img>
            <div>
              <p style={{ fontSize: '13px', fontWeight: '400px', color: 'black', whiteSpace: 'nowrap' }}>{t("dp.rubk2")}</p>
              <p style={{ fontSize: '10px', fontWeight: '400px', whiteSpace: 'nowrap' }}>1000 RUB - 150000 RUB</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
              <p style={{fontSize:'12px'}}>Soon</p>
            </div>
          </div>

          <h1 id={styles.label}>{t("dp.kazakhastan")}</h1>
          <div onClick={() => { setCurrentToken("kzt"); setCurrentCurrency(3); setCurrentHeader(t('dp.payfromkazakhastan')); setStep(2) }} className={styles.option}>
            <img src={kazakhastanpay}></img>
            <div>
              <p style={{ fontSize: '13px', fontWeight: '400px', color: 'black', whiteSpace: 'nowrap' }}>{t("dp.kzbk")}</p>
              <p style={{ fontSize: '10px', fontWeight: '400px', whiteSpace: 'nowrap' }}>5000 KZT - 1000000 KZT</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
              <img src={keyboardarrowright}></img>
            </div>
          </div>

          <h1 id={styles.label}>{t("dp.azerbaijan")}</h1>
          <div onClick={() => { setCurrentToken("AZNP2P"); setCurrentCurrency('AZN'); setCurrentHeader(t('dp.payfromazerbaijan')); setStep(2) }} className={styles.option}>
            <img src={azerbaijan}></img>
            <div>
              <p style={{ fontSize: '13px', fontWeight: '400px', color: 'black', whiteSpace: 'nowrap' }}>{t("dp.azbk")}</p>
              <p style={{ fontSize: '10px', fontWeight: '400px', whiteSpace: 'nowrap' }}>17 AZN - 1500 AZN</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
              <img src={keyboardarrowright}></img>
            </div>
          </div>
          <div style={{ height: '10px' }}></div>
          <div onClick={() => { setCurrentToken("azn"); setCurrentCurrency(37); setCurrentHeader(t('dp.payfromazerbaijan')); setStep(2) }} src={keyboardarrowright} className={styles.option}>
            <img src={azerbaijan}></img>
            <div>
              <p style={{ fontSize: '13px', fontWeight: '400px', color: 'black', whiteSpace: 'nowrap' }}>{t("dp.azbk2")}</p>
              <p style={{ fontSize: '10px', fontWeight: '400px', whiteSpace: 'nowrap' }}>17 AZN - 1500 AZN</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
              <img src={keyboardarrowright}></img>
            </div>
          </div>

          <h1 id={styles.label}>{t("dp.anywhere")}</h1>
          <div onClick={() => { setCurrentToken("crypto"); setCurrentCurrency('crypto'); setCurrentHeader(t("dp.payfromanywhere")); setStep(2) }} className={styles.option}>
            <img src={payfromanywhereicons}></img>
            <div>
              <p style={{ fontSize: '13px', fontWeight: '400px', color: 'black', whiteSpace: 'nowrap' }}>{t("dp.crypto")}</p>
              <div style={{ display: 'flex' }}><p style={{ fontSize: '10px', fontWeight: '400px', whiteSpace: 'nowrap', paddingRight: '0px', display: 'flex', alignItems: 'center' }}>10 USD - </p><img src={infinity}></img></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
              <img src={keyboardarrowright}></img>
            </div>
          </div>

          <h1 id={styles.label}>{t("dp.europe")}</h1>
          <div className={styles.option}>
            <img className={styles.grayImage} src={payfromeuropeicon}></img>
            <div>
              <p style={{ fontSize: '13px', fontWeight: '400px', color: 'black', whiteSpace: 'nowrap' }}>{t("dp.eurob")}</p>
              <p style={{ fontSize: '10px', fontWeight: '400px', whiteSpace: 'nowrap' }}>10 EUR - 10000 EUR</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
              <p style={{fontSize:'12px'}}>Soon</p>
            </div>

          </div>
        </div>
      </div>
    case 2:
      return <div className={styles.popup}>
        <div className={styles.popupinner}>
          <button onClick={togglePopup} className={styles.closebutton2}><img style={{ height: "25px", width: "25px" }} alt='x' src={cancel}></img></button>
          <h1 id={styles.label} style={{ marginTop: '10px', textAlign: 'center' }}>{currentHeader}</h1>
          <button onClick={() => { setStep(1) }} className={styles.backbutton}><img style={{ height: "12px", width: "7px" }} alt='x' src={keyboardarrowleft}></img></button>
          <div style={{ textAlign: "center" }}><p style={{ fontSize: '10px', fontWeight: '400', margin: 0 }}>{t("dp.enterdeposit")}</p></div>
          <div className={styles.depositinput} >
            <div style={{ borderBottom: `1px solid black`, position: 'relative' }}><input id={notEnough ? (styles.err) : ('')} style={{ fontSize: '24px', fontWeight: '500', padding: '0px 0px 0px 0px', textAlign: 'center', width: "100%", border: 'none', borderRadius: '0' }}
              placeholder=''
              type="number"
              name="amount"
              value={depositAmount}
              onChange={handleInputsChange}

            />
              <p style={{ color: 'black', position: 'absolute', right: 0, top: '0', fontSize: '24px', fontWeight: '500' }}>$</p>
            </div>
          </div>
          {error && <span className={styles.depositError}>{error}</span>}


          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: "10px", padding: '15px 22px 20px' }}>
            {presetPrices.map((price, i) => {
              return <div key={i} onClick={() => { changeDepositAmount(price) }} className={price != depositAmount ? (styles.presetPrice) : (styles.presetPriceSelected)}>
                {price}
              </div>
            })}
          </div>



          <div className={styles.bonusboxes}>
            <div id={currentBonus == 1 ? (styles.selected) : ({})} className={styles.bonusbox}>
              <img id={currentBonus == 1 ? (styles.selected) : ({})} className={styles.bonusimg} src={bronze}></img>
              <div>
                <p id={currentBonus == 1 ? (styles.selected) : ({})} className={styles.bonuslabel}>{t("dp.bonusup")} $250</p>
                <p id={currentBonus == 1 ? (styles.selected) : ({})} className={styles.minilabel}>{t("dp.depositup")} $20</p>
              </div>
            </div>
            <div className={styles.bonusbox}>
              <img id={currentBonus == 2 ? (styles.selected) : ({})} className={styles.bonusimg} src={silver}></img>
              <div>
                <p id={currentBonus == 2 ? (styles.selected) : ({})} className={styles.bonuslabel}>{t("dp.bonusup")} $500</p>
                <p id={currentBonus == 2 ? (styles.selected) : ({})} className={styles.minilabel}>{t("dp.deposit")} $20-$75</p>
              </div>
            </div>
            <div className={styles.bonusbox}>
              <img id={currentBonus == 3 ? (styles.selected) : ({})} className={styles.bonusimg} src={gold}></img>
              <div>
                <p id={currentBonus == 3 ? (styles.selected) : ({})} className={styles.bonuslabel}>{t("dp.bonusup")} $1000</p>
                <p id={currentBonus == 3 ? (styles.selected) : ({})} className={styles.minilabel}>{t("dp.depositover")} $75</p>
              </div>
            </div>
          </div>
          <button disabled={notEnough} className={styles.submitbutton} onClick={() => { startDeposit(depositAmount, currentToken, currentCurrency) }}>{t("dp.completein")} {currencyDisplay[currentCurrency]}</button>
          <div>
            <p style={{ fontSize: '8px', textAlign: 'center' }}>{t("dp.urdeposit")}</p>
            <p style={{ fontSize: '8px', textAlign: 'center' }}>{t("dp.garanex")} </p>
          </div>
        </div>
      </div>
    default:
      return <></>;
  }
}

export default DepositPopup;