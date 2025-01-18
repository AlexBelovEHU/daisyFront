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

const CookiePolicy = () => {
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
          <h1 className="c6" id="h.om9v1am0g4s3"><span className="c7">COOKIE POLICY</span></h1><h4 className="c5" id="h.2oqlam4fgyq6"><span className="c8">INFORMATION ABOUT OUR USE OF COOKIES</span></h4><p className="c3"><span className="c2">Our website uses cookies to distinguish you from other users of our site. This helps us to provide you with a good experience when you browse our site and also allows us to improve our site. By continuing to browse the site, you are agreeing to our use of cookies.</span></p><p className="c0"><span className="c2"></span></p><p className="c3"><span className="c2">A cookie is a small file of letters and numbers that we store on your browser or the hard drive of your computer if you agree. Cookies contain information that is transferred to your computer&#39;s hard drive.</span></p><p className="c0"><span className="c2"></span></p><p className="c3"><span className="c2">We use the following cookies:</span></p><ul className="c1 lst-kix_mpean9myq09e-0 start"><li className="c3 c4 li-bullet-0"><span className="c2">Strictly necessary cookies. These are cookies that are required for the operation of our site. They include, for example, cookies that enable you to log into secure areas of our site, use a shopping cart or make use of e-billing services.</span></li><li className="c3 c4 li-bullet-0"><span className="c2">Analytical/performance cookies. They allow us to recognise and count the number of visitors and to see how visitors move around our site when they are using it. This helps us to improve the way our site works, for example, by ensuring that users are finding what they are looking for easily.</span></li><li className="c3 c4 li-bullet-0"><span className="c2">Functionality cookies. These are used to recognise you when you return to our site. This enables us to personalise our content for you, greet you by name and remember your preferences (for example, your choice of language or region).</span></li><li className="c3 c4 li-bullet-0"><span className="c2">Targeting cookies. These cookies record your visit to our site, the pages you have visited and the links you have followed. We will use this information to make our site and the advertising displayed on it more relevant to your interests. We may also share this information with third parties for this purpose.</span></li></ul><p className="c0"><span className="c2"></span></p><p className="c3"><span className="c2">Please note that third parties (including, for example, advertising networks and providers of external services like web traffic analysis services) may also use cookies, over which we have no control. These cookies are likely to be analytical/performance cookies or targeting cookies.</span></p><p className="c0"><span className="c2"></span></p><p className="c3"><span className="c2">You block cookies by activating the setting on your browser that allows you to refuse the setting of all or some cookies. However, if you use your browser settings to block all cookies (including essential cookies) you may not be able to access all or parts of our site.</span></p><p className="c0"><span className="c2"></span></p><p className="c3"><span className="c2">We may revise this use of cookie policy at any time by amending this page. You are expected to check this page from time to time to take notice of any changes we make, as they are legally binding on you. Some of the provisions contained in this use of cookie policy may also be superseded by provisions or notices published elsewhere on our site.</span></p><p className="c0"><span className="c2"></span></p>
        </div>
        <LiveAnbox />
      </div>
      <Footer></Footer>
    </div>
  )
};


export default CookiePolicy;
