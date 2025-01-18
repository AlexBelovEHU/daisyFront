/* eslint-disable eqeqeq */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Main.module.css";
import LiveAnbox from "../LiveAnbox/LiveAnbox";

import { depositlink } from "../../redux/actions/depositAction";
import { loginPost } from "../../redux/actions/loginAction";
import { signPost } from "../../redux/actions/signAction";
import { allboxes } from "../../redux/actions/allboxesAction";
import { balanceget } from "../../redux/actions/balanceGetAction";
import Footer from "../../components/Footer/Footer";

import StickyMenuLogInOptions from '../../components/StickyMenuLogInOptions/StickyMenuLogInOptions'
import DepositPopup from '../../components/DepositPopup/DepositPopup';
import WithdrawPopup from '../../components/WithdrawPopup/WithdrawPopup';
import LoginPopup from "../../components/LoginPopup/LoginPopup";
import SignUpPopup from "../../components/SignUpPopup/SignUpPopup";

import StickyMenuTop from "../../components/StickyMenuTop/StickyMenuTop"
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.example.loading);
  const characters = useSelector((state) => state.example.payload);
  const payloadType = useSelector((state) => state.example.payloadType)
  const [balance, setBalance] = React.useState('0.00')
  const [bonusBoxes, setBonusBoxes] = React.useState([])
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [showDepositPopup, setShowDP] = React.useState(false);
  const [showWithdrawalPopup, setShowWP] = React.useState(false);
  const [showSignUpPopup, setShowSUP] = React.useState(false);
  const [showLoginPopup, setShowLP] = React.useState(false);
  const [isDepositing, setIsDepositing] = React.useState(false);
  const [showSMLIO, setShowSMLIO] = React.useState(true);
  const [isSignError, setIsSignError] = React.useState(false);
  const [isLoginError, setIsLoginError] = React.useState(false);
    const { t } = useTranslation();



  const toggleSMLIO = () => {
    setShowSMLIO(!showSMLIO)
  }

  const toggleDP = () => {
    //window.location.href='https://buy.stripe.com/fZecPK7C1dmr70kfZ0'
    setShowDP(!showDepositPopup)
  }
  const toggleWP = () => {
    setShowWP(!showWithdrawalPopup)
  }

  const toggleSUP = () => {
    setShowSUP(!showSignUpPopup)
    setShowLP(false)
    toggleSMLIO()
  }

  const toggleLP = () => {
    setShowLP(!showLoginPopup)
    setShowSUP(false)
    toggleSMLIO()
  }


  const handleLogin = (username, password) => {
    dispatch(loginPost(username, password))
    //setShowLP(false)
    //setShowSMLIO(false)
    //setLoggedIn(true)
  }

  const handleGoogleLogin = () => {
    window.location.href = window.clientConfig.url+"/google_auth";
  }

  const handleSignUp = (username, password) => {
    dispatch(signPost(username, password))
    //setShowLP(false)
    //setShowSMLIO(false)
    //setLoggedIn(true)
  }


  const onDeposit = (amount) => {
    dispatch(depositlink(amount));
    setIsDepositing(true)
  }

  if (!loading && isDepositing&& characters.url!=undefined) {
    
    localStorage.setItem('depositUrlLog',characters)
    window.location.href = characters.url;
    setIsDepositing(false);
  }

  useEffect(() => {
    dispatch(allboxes(1));
    console.log("1")
  }, [dispatch]);
  useEffect(() => {
    dispatch(balanceget());
    console.log("1")
  }, [dispatch])

  useEffect(() => {
    if (characters[0] == "NotLoggedIn") {
      console.log("NotLoggedIn")
      setLoggedIn(false)
    } else {
      if (payloadType == "BALANCE_GET") {
        setLoggedIn(true)
        console.log('balance', characters.balance)
        console.log('bonusBoxes', characters)

        setBonusBoxes(characters.bonus_boxes)
        setBalance(characters.balance)
      }
      else if (payloadType == "LOGIN") {
        if (characters == "ErrorIncorrectPassword") {
          setIsLoginError(true)
        } else {
          setLoggedIn(true)
          console.log("info", characters.balance)
          console.log('balance', characters.balance)
          setBalance(characters.balance)
          setShowLP(false)
        }
      } else if (payloadType == "SIGN") {
        if (characters == "userexists422") {
          setIsSignError(true)
        } else {
          setLoggedIn(true)
          console.log("info", characters.balance)
          console.log('balance', characters.balance)
          setBalance(characters.balance)
          setShowSUP(false)
        }
      }
      else {
        console.log('Unknown Payload')
      }
    }
  }, [loading, characters, payloadType])

  const switchToSUP = () => {
    setShowLP(false)
    setShowSUP(true)
  }
  const switchToLP = () => {
    setShowLP(true)
    setShowSUP(false)
  }


  return (
    <div>
      <StickyMenuTop toggleSP={toggleSUP} openBonusBox={()=>{window.location.href='/'}} toggleLP={toggleLP} bonusBoxes={bonusBoxes} balance={balance} toggleDP={toggleDP} toggleWP={toggleWP} isloggedIn={loggedIn} />
      {showLoginPopup ? (<LoginPopup isError={isLoginError} openSignPopup={switchToSUP} handleLoginGoogle={handleGoogleLogin} handleLogin={handleLogin} closePopup={toggleLP} />) : (<></>)}
      {showSignUpPopup ? (<SignUpPopup handleLoginGoogle={handleGoogleLogin} isError={isSignError} openLoginPopup={switchToLP} handleSignUp={handleSignUp} closePopup={toggleSUP} />) : (<></>)}
      {showDepositPopup ? (<DepositPopup onDeposit={onDeposit} togglePopup={toggleDP}></DepositPopup>) : (<></>)}
      {showWithdrawalPopup ? (<WithdrawPopup togglePopup={toggleWP} />) : (<></>)}
      {loggedIn || !showSMLIO ? (<></>) : (<StickyMenuLogInOptions googleLogin={handleGoogleLogin} logIn={toggleLP} signUp={toggleSUP} />)}
      <div className={styles.container}>
        <div className={styles.leftbody}>
          <h1 className={styles.fatheader}>{t("ab.header")}</h1>
          <p className={styles.description}>{t("ab.welcometo")}</p>
          <p className={styles.description}>{t("ab.atanboxme")}</p>
          <p className={styles.description}>{t("ab.howdoes")}</p>
          <p className={styles.description}>{t("ab.ourcommitment")}</p>
          <p className={styles.description}>{t("ab.joinus")}</p>
          <p className={styles.description}>{t("ab.come")}</p>
        </div>
        <LiveAnbox />
      </div>
      <Footer></Footer>
    </div>
  )
};


export default AboutUs;
