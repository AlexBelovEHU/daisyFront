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

const ProvablyFair = () => {
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
  const lng = localStorage.getItem("currentLanguage")



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
    window.location.href = window.clientConfig.url + "/google_auth";
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

  if (!loading && isDepositing && characters.url != undefined) {

    localStorage.setItem('depositUrlLog', characters)
    window.location.href = characters.url;
    setIsDepositing(false);
  }

  useEffect(() => {
    dispatch(allboxes(1));
  }, [dispatch]);
  useEffect(() => {
    dispatch(balanceget());
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
      <StickyMenuTop toggleSP={toggleSUP} openBonusBox={() => { window.location.href = '/' }} toggleLP={toggleLP} bonusBoxes={bonusBoxes} balance={balance} toggleDP={toggleDP} toggleWP={toggleWP} isloggedIn={loggedIn} />
      {showLoginPopup ? (<LoginPopup isError={isLoginError} openSignPopup={switchToSUP} handleLoginGoogle={handleGoogleLogin} handleLogin={handleLogin} closePopup={toggleLP} />) : (<></>)}
      {showSignUpPopup ? (<SignUpPopup handleLoginGoogle={handleGoogleLogin} isError={isSignError} openLoginPopup={switchToLP} handleSignUp={handleSignUp} closePopup={toggleSUP} />) : (<></>)}
      {showDepositPopup ? (<DepositPopup onDeposit={onDeposit} togglePopup={toggleDP}></DepositPopup>) : (<></>)}
      {showWithdrawalPopup ? (<WithdrawPopup togglePopup={toggleWP} />) : (<></>)}
      {loggedIn || !showSMLIO ? (<></>) : (<StickyMenuLogInOptions googleLogin={handleGoogleLogin} logIn={toggleLP} signUp={toggleSUP} />)}
      <div className={styles.container}>
        <div className={styles.leftbody}>
          {
            lng == "en" ? (
              <><h2 className="c3" id="h.kqskefcs91lw"><span className="c5">PROVABLY FAIR</span></h2><p className="c0"><span className="c1">In order to maintain a fair and engaging atmosphere, we employ a provably fair approach to ascertain the content of each unboxed item. This approach involves a process of generating a random outcome through the utilization of three distinct components, thus enabling us to demonstrate the unpredictability of each game played.</span></p><p className="c0 c2"><span className="c1"></span></p><p className="c0"><span className="c1">Imagine participating in a physical game involving dice or a deck of cards, where you could ensure randomness by inspecting the six unique sides of the die or the 52 distinct cards in the deck. While the dynamics differ in an online setting, the fundamental principle remains somewhat analogous.</span></p><p className="c0 c2"><span className="c1"></span></p><p className="c0"><span className="c1">It&#39;s important to note that this remains a game of chance, and we&#39;re committed to transparency: the higher the value of the item, the lower the probability of unboxing it. Nonetheless, our primary goal is to empower you to verify the fairness of the process while ensuring an enjoyable experience.</span></p><p className="c0 c2"><span className="c1"></span></p><h2 className="c3" id="h.fre0iiq4m4f9"><span className="c5">GAME RESULT</span></h2><p className="c0"><span className="c1">The item you receive in your box is determined by three variables. Although we operate with a sophisticated algorithm, a simplified way to comprehend it is to liken it to the classic hand game of &#39;Rock, Paper, Scissors,&#39; albeit with several more potential outcomes.</span></p><p className="c0 c2"><span className="c1"></span></p><p className="c0"><span className="c1">Firstly, there&#39;s Your Hand, represented by the initial code generated. What distinguishes it as your hand? Well, you have the option to modify it as you see fit. Additionally, you can view other users&#39; hands to ascertain their outcomes. The choice is entirely yours, and you retain the flexibility to alter Your Hand at any juncture.</span></p><p className="c0 c2"><span className="c1"></span></p><p className="c0"><span className="c1">Then there&#39;s Our Hand, denoting a concealed code that remains undisclosed until you opt to reveal it. Finally, there&#39;s the Play Count, which signifies the number of games you&#39;ve played with us. It&#39;s the simplest variable, beginning at one and incrementing by one with each game you play.</span></p><p className="c0 c2"><span className="c1"></span></p><p className="c0"><span className="c1">Similar to the dynamics of &#39;Rock, Paper, Scissors,&#39; Your Hand, Our Hand, and the Play Count will differ each time, yielding a different outcome. Thus, with each play, you&#39;ll have the opportunity to reveal a distinct item in your box, which we will subsequently pack and dispatch to you personally.</span></p><p className="c0 c2"><span className="c1"></span></p><p className="c0"><span className="c1">GENERATION</span></p><p className="c0"><span className="c1">Each potential unboxed item is associated with a roll number, with a total of 100,000,000 possible roll numbers. Every roll is determined by a combination of three distinct elements:</span></p><p className="c0 c2"><span className="c1"></span></p><p className="c0"><span className="c1">Client Seed: This represents a passphrase originating from you and your browser. You can view it before unboxing an item and even modify it before commencing the game if you believe it will enhance your chances. Moreover, you have the option to examine other players&#39; seeds to observe their outcomes.</span></p><p className="c0 c2"><span className="c1"></span></p><p className="c0"><span className="c1">Server Seed: This constitutes an exceptionally lengthy numerical code provided by us. Prior to commencing the game, we will display an encrypted version or hash, ensuring that the result remains predetermined without allowing you to anticipate the outcome beforehand. Our aim is to ensure equity for all participants.</span></p><p className="c0 c2"><span className="c1"></span></p><p className="c0"><span className="c1">Upon unboxing an item, you&#39;ll unveil the unhashed Server Seed, enabling you to cross-verify the outcomes from previous games employing the same seed.</span></p><p className="c0 c2"><span className="c1"></span></p><p className="c0"><span className="c1">Play Count: This factor is straightforward; it represents the number of games you&#39;ve played. Even if you were to possess the same Client Seed and Server Seed from a previous game, the subsequent game&#39;s outcome would still differ due to the incremented Play Count.</span></p><p className="c0 c2"><span className="c1"></span></p><p className="c0"><span className="c1">PROBABILITY</span></p><p className="c0"><span className="c1">As each item or outcome is linked to a roll number, the probability of a specific outcome remains constant, irrespective of how many times you play, even if you were to participate 100,000,000 times. There is no pattern or strategy employed to determine when the more valuable items will be won; it&#39;s purely based on randomness.</span></p><p className="c0 c2"><span className="c1"></span></p><p className="c0"><span className="c1">To ascertain the probability of each individual item within a box, simply click on &#39;Toggle Rates&#39; at the top to view the chances expressed as a percentage.</span></p><p className="c0 c2"><span className="c1"></span></p><h2 className="c3" id="h.biiyovdh07jq"><span className="c5">Independent Verification</span></h2><p className="c0"><span className="c1">You can verify the fairness of each round by accessing the game history and copying the round number, client seed, and server seed.</span></p><p className="c0 c2"><span className="c1"></span></p><p className="c0"><span className="c1">The hashed version of the combined seed is publicly accessible.</span></p><p className="c0 c2"><span className="c1"></span></p><p className="c0"><span className="c1">The accuracy of the hash can be checked using any online calculator.</span></p><p className="c0 c2"><span className="c1"></span></p><p className="c0 c2"><span className="c1"></span></p><p className="c0 c2"><span className="c1"></span></p><p className="c0 c2"><span className="c1"></span></p></>
            ) : (<></>)
          }
          {
            lng == "ru" ? (
              <><p class="c0"><span class="c0">&#1044;&#1086;&#1082;&#1072;&#1079;&#1091;&#1077;&#1084;&#1072;&#1103; &#1095;&#1077;&#1089;&#1090;&#1085;&#1086;&#1089;&#1090;&#1100;</span></p><p class="c2"><span class="c1">&#1044;&#1083;&#1103; &#1087;&#1086;&#1076;&#1076;&#1077;&#1088;&#1078;&#1072;&#1085;&#1080;&#1103; &#1095;&#1077;&#1089;&#1090;&#1085;&#1086;&#1081; &#1080; &#1091;&#1074;&#1083;&#1077;&#1082;&#1072;&#1090;&#1077;&#1083;&#1100;&#1085;&#1086;&#1081; &#1072;&#1090;&#1084;&#1086;&#1089;&#1092;&#1077;&#1088;&#1099; &#1084;&#1099; &#1080;&#1089;&#1087;&#1086;&#1083;&#1100;&#1079;&#1091;&#1077;&#1084; &#1087;&#1086;&#1076;&#1093;&#1086;&#1076; &#1076;&#1086;&#1082;&#1072;&#1079;&#1091;&#1077;&#1084;&#1086;&#1081; &#1095;&#1077;&#1089;&#1090;&#1085;&#1086;&#1089;&#1090;&#1080;, &#1095;&#1090;&#1086;&#1073;&#1099; &#1086;&#1087;&#1088;&#1077;&#1076;&#1077;&#1083;&#1080;&#1090;&#1100; &#1074;&#1099;&#1080;&#1075;&#1088;&#1099;&#1096; &#1074; &#1082;&#1072;&#1078;&#1076;&#1086;&#1081; &#1086;&#1090;&#1082;&#1088;&#1099;&#1090;&#1086;&#1081; &#1082;&#1086;&#1088;&#1086;&#1073;&#1082;&#1080;. &#1069;&#1090;&#1086;&#1090; &#1087;&#1086;&#1076;&#1093;&#1086;&#1076; &#1074;&#1082;&#1083;&#1102;&#1095;&#1072;&#1077;&#1090; &#1087;&#1088;&#1086;&#1094;&#1077;&#1089;&#1089; &#1075;&#1077;&#1085;&#1077;&#1088;&#1072;&#1094;&#1080;&#1080; &#1089;&#1083;&#1091;&#1095;&#1072;&#1081;&#1085;&#1086;&#1075;&#1086; &#1088;&#1077;&#1079;&#1091;&#1083;&#1100;&#1090;&#1072;&#1090;&#1072; &#1089; &#1080;&#1089;&#1087;&#1086;&#1083;&#1100;&#1079;&#1086;&#1074;&#1072;&#1085;&#1080;&#1077;&#1084; &#1090;&#1088;&#1077;&#1093; &#1088;&#1072;&#1079;&#1083;&#1080;&#1095;&#1085;&#1099;&#1093; &#1082;&#1086;&#1084;&#1087;&#1086;&#1085;&#1077;&#1085;&#1090;&#1086;&#1074;, &#1095;&#1090;&#1086; &#1087;&#1086;&#1079;&#1074;&#1086;&#1083;&#1103;&#1077;&#1090; &#1085;&#1072;&#1084; &#1076;&#1077;&#1084;&#1086;&#1085;&#1089;&#1090;&#1088;&#1080;&#1088;&#1086;&#1074;&#1072;&#1090;&#1100; &#1085;&#1077;&#1087;&#1088;&#1077;&#1076;&#1089;&#1082;&#1072;&#1079;&#1091;&#1077;&#1084;&#1086;&#1089;&#1090;&#1100; &#1082;&#1072;&#1078;&#1076;&#1086;&#1081; &#1089;&#1099;&#1075;&#1088;&#1072;&#1085;&#1085;&#1086;&#1081; &#1080;&#1075;&#1088;&#1099;.</span></p><p class="c2 c4"><span class="c1"></span></p><p class="c2"><span class="c1">&#1055;&#1088;&#1077;&#1076;&#1089;&#1090;&#1072;&#1074;&#1100;&#1090;&#1077; &#1089;&#1077;&#1073;&#1077; &#1091;&#1095;&#1072;&#1089;&#1090;&#1080;&#1077; &#1074; &#1092;&#1080;&#1079;&#1080;&#1095;&#1077;&#1089;&#1082;&#1086;&#1081; &#1080;&#1075;&#1088;&#1077; &#1089; &#1080;&#1089;&#1087;&#1086;&#1083;&#1100;&#1079;&#1086;&#1074;&#1072;&#1085;&#1080;&#1077;&#1084; &#1082;&#1091;&#1073;&#1080;&#1082;&#1086;&#1074; &#1080;&#1083;&#1080; &#1082;&#1086;&#1083;&#1086;&#1076;&#1099; &#1082;&#1072;&#1088;&#1090;, &#1075;&#1076;&#1077; &#1089;&#1083;&#1091;&#1095;&#1072;&#1081;&#1085;&#1086;&#1089;&#1090;&#1100; &#1084;&#1086;&#1078;&#1085;&#1086; &#1075;&#1072;&#1088;&#1072;&#1085;&#1090;&#1080;&#1088;&#1086;&#1074;&#1072;&#1090;&#1100;, &#1086;&#1089;&#1084;&#1072;&#1090;&#1088;&#1080;&#1074;&#1072;&#1103; &#1096;&#1077;&#1089;&#1090;&#1100; &#1075;&#1088;&#1072;&#1085;&#1077;&#1081; &#1082;&#1091;&#1073;&#1080;&#1082;&#1072; &#1080;&#1083;&#1080; 52 &#1082;&#1072;&#1088;&#1090;&#1099; &#1074; &#1082;&#1086;&#1083;&#1086;&#1076;&#1077;. &#1061;&#1086;&#1090;&#1103; &#1076;&#1080;&#1085;&#1072;&#1084;&#1080;&#1082;&#1072; &#1074; &#1086;&#1085;&#1083;&#1072;&#1081;&#1085;-&#1089;&#1088;&#1077;&#1076;&#1077; &#1086;&#1090;&#1083;&#1080;&#1095;&#1072;&#1077;&#1090;&#1089;&#1103;, &#1086;&#1089;&#1085;&#1086;&#1074;&#1086;&#1087;&#1086;&#1083;&#1072;&#1075;&#1072;&#1102;&#1097;&#1080;&#1081; &#1087;&#1088;&#1080;&#1085;&#1094;&#1080;&#1087; &#1086;&#1089;&#1090;&#1072;&#1077;&#1090;&#1089;&#1103; &#1089;&#1093;&#1086;&#1078;&#1080;&#1084;.</span></p><p class="c2 c4"><span class="c1"></span></p><p class="c2"><span class="c1">&#1042;&#1072;&#1078;&#1085;&#1086; &#1086;&#1090;&#1084;&#1077;&#1090;&#1080;&#1090;&#1100;, &#1095;&#1090;&#1086; &#1101;&#1090;&#1086; &#1086;&#1089;&#1090;&#1072;&#1077;&#1090;&#1089;&#1103; &#1080;&#1075;&#1088;&#1086;&#1081; &#1085;&#1072; &#1091;&#1076;&#1072;&#1095;&#1091;, &#1080; &#1084;&#1099; &#1087;&#1088;&#1080;&#1076;&#1077;&#1088;&#1078;&#1080;&#1074;&#1072;&#1077;&#1084;&#1089;&#1103; &#1087;&#1088;&#1086;&#1079;&#1088;&#1072;&#1095;&#1085;&#1086;&#1089;&#1090;&#1080;: &#1095;&#1077;&#1084; &#1074;&#1099;&#1096;&#1077; &#1094;&#1077;&#1085;&#1085;&#1086;&#1089;&#1090;&#1100; &#1087;&#1088;&#1077;&#1076;&#1084;&#1077;&#1090;&#1072;, &#1090;&#1077;&#1084; &#1085;&#1080;&#1078;&#1077; &#1074;&#1077;&#1088;&#1086;&#1103;&#1090;&#1085;&#1086;&#1089;&#1090;&#1100; &#1077;&#1075;&#1086; &#1087;&#1086;&#1083;&#1091;&#1095;&#1077;&#1085;&#1080;&#1103;. &#1058;&#1077;&#1084; &#1085;&#1077; &#1084;&#1077;&#1085;&#1077;&#1077;, &#1085;&#1072;&#1096;&#1072; &#1086;&#1089;&#1085;&#1086;&#1074;&#1085;&#1072;&#1103; &#1094;&#1077;&#1083;&#1100; &mdash; &#1076;&#1072;&#1090;&#1100; &#1074;&#1072;&#1084; &#1074;&#1086;&#1079;&#1084;&#1086;&#1078;&#1085;&#1086;&#1089;&#1090;&#1100; &#1087;&#1088;&#1086;&#1074;&#1077;&#1088;&#1080;&#1090;&#1100; &#1095;&#1077;&#1089;&#1090;&#1085;&#1086;&#1089;&#1090;&#1100; &#1087;&#1088;&#1086;&#1094;&#1077;&#1089;&#1089;&#1072;, &#1086;&#1076;&#1085;&#1086;&#1074;&#1088;&#1077;&#1084;&#1077;&#1085;&#1085;&#1086; &#1086;&#1073;&#1077;&#1089;&#1087;&#1077;&#1095;&#1080;&#1074;&#1072;&#1103; &#1091;&#1076;&#1086;&#1074;&#1086;&#1083;&#1100;&#1089;&#1090;&#1074;&#1080;&#1077; &#1086;&#1090; &#1091;&#1095;&#1072;&#1089;&#1090;&#1080;&#1103;.</span></p><p class="c0 c4"><span class="c0"></span></p><p class="c0"><span class="c0">&#1056;&#1045;&#1047;&#1059;&#1051;&#1068;&#1058;&#1040;&#1058; &#1048;&#1043;&#1056;&#1067;</span></p><p class="c2"><span class="c1">&#1055;&#1088;&#1077;&#1076;&#1084;&#1077;&#1090;, &#1082;&#1086;&#1090;&#1086;&#1088;&#1099;&#1081; &#1074;&#1099; &#1087;&#1086;&#1083;&#1091;&#1095;&#1080;&#1090;&#1077; &#1074; &#1089;&#1074;&#1086;&#1077;&#1081; &#1082;&#1086;&#1088;&#1086;&#1073;&#1082;&#1077;, &#1086;&#1087;&#1088;&#1077;&#1076;&#1077;&#1083;&#1103;&#1077;&#1090;&#1089;&#1103; &#1090;&#1088;&#1077;&#1084;&#1103; &#1087;&#1077;&#1088;&#1077;&#1084;&#1077;&#1085;&#1085;&#1099;&#1084;&#1080;. &#1061;&#1086;&#1090;&#1103; &#1084;&#1099; &#1080;&#1089;&#1087;&#1086;&#1083;&#1100;&#1079;&#1091;&#1077;&#1084; &#1089;&#1083;&#1086;&#1078;&#1085;&#1099;&#1081; &#1072;&#1083;&#1075;&#1086;&#1088;&#1080;&#1090;&#1084;, &#1076;&#1083;&#1103; &#1091;&#1087;&#1088;&#1086;&#1097;&#1077;&#1085;&#1080;&#1103; &#1077;&#1075;&#1086; &#1084;&#1086;&#1078;&#1085;&#1086; &#1087;&#1088;&#1077;&#1076;&#1089;&#1090;&#1072;&#1074;&#1080;&#1090;&#1100; &#1082;&#1072;&#1082; &#1082;&#1083;&#1072;&#1089;&#1089;&#1080;&#1095;&#1077;&#1089;&#1082;&#1091;&#1102; &#1080;&#1075;&#1088;&#1091; &ldquo;&#1050;&#1072;&#1084;&#1077;&#1085;&#1100;, &#1085;&#1086;&#1078;&#1085;&#1080;&#1094;&#1099;, &#1073;&#1091;&#1084;&#1072;&#1075;&#1072;&rdquo;, &#1085;&#1086; &#1089; &#1073;&#1086;&#1083;&#1100;&#1096;&#1080;&#1084; &#1082;&#1086;&#1083;&#1080;&#1095;&#1077;&#1089;&#1090;&#1074;&#1086;&#1084; &#1074;&#1086;&#1079;&#1084;&#1086;&#1078;&#1085;&#1099;&#1093; &#1080;&#1089;&#1093;&#1086;&#1076;&#1086;&#1074;.</span></p><p class="c2 c4"><span class="c1"></span></p><p class="c2"><span class="c0">&#1042;&#1086;-&#1087;&#1077;&#1088;&#1074;&#1099;&#1093;, &#1077;&#1089;&#1090;&#1100; </span><span class="c0 c7">&#1042;&#1072;&#1096;&#1072; &#1088;&#1091;&#1082;&#1072;</span><span class="c1">, &#1082;&#1086;&#1090;&#1086;&#1088;&#1072;&#1103; &#1087;&#1088;&#1077;&#1076;&#1089;&#1090;&#1072;&#1074;&#1083;&#1077;&#1085;&#1072; &#1085;&#1072;&#1095;&#1072;&#1083;&#1100;&#1085;&#1099;&#1084; &#1082;&#1086;&#1076;&#1086;&#1084;, &#1089;&#1075;&#1077;&#1085;&#1077;&#1088;&#1080;&#1088;&#1086;&#1074;&#1072;&#1085;&#1085;&#1099;&#1084; &#1085;&#1072; &#1074;&#1072;&#1096;&#1077;&#1081; &#1089;&#1090;&#1086;&#1088;&#1086;&#1085;&#1077;. </span></p><p class="c2 c4"><span class="c1"></span></p><p class="c2"><span class="c0">&#1047;&#1072;&#1090;&#1077;&#1084; &#1080;&#1076;&#1105;&#1090; </span><span class="c0 c7">&#1053;&#1072;&#1096;&#1072; &#1088;&#1091;&#1082;&#1072;</span><span class="c1">, &#1086;&#1073;&#1086;&#1079;&#1085;&#1072;&#1095;&#1072;&#1102;&#1097;&#1072;&#1103; &#1089;&#1082;&#1088;&#1099;&#1090;&#1099;&#1081; &#1082;&#1086;&#1076;, &#1082;&#1086;&#1090;&#1086;&#1088;&#1099;&#1081; &#1086;&#1089;&#1090;&#1072;&#1105;&#1090;&#1089;&#1103; &#1079;&#1072;&#1089;&#1077;&#1082;&#1088;&#1077;&#1095;&#1077;&#1085;&#1085;&#1099;&#1084; &#1076;&#1086; &#1079;&#1072;&#1074;&#1077;&#1088;&#1096;&#1077;&#1085;&#1080;&#1103; &#1074;&#1088;&#1072;&#1097;&#1077;&#1085;&#1080;&#1103;. </span></p><p class="c2 c4"><span class="c1"></span></p><p class="c2"><span class="c0">&#1053;&#1072;&#1082;&#1086;&#1085;&#1077;&#1094;, &#1077;&#1089;&#1090;&#1100; </span><span class="c0 c7">&#1057;&#1095;&#1105;&#1090;&#1095;&#1080;&#1082; &#1080;&#1075;&#1088;</span><span class="c1">, &#1082;&#1086;&#1090;&#1086;&#1088;&#1099;&#1081; &#1091;&#1082;&#1072;&#1079;&#1099;&#1074;&#1072;&#1077;&#1090; &#1082;&#1086;&#1083;&#1080;&#1095;&#1077;&#1089;&#1090;&#1074;&#1086; &#1080;&#1075;&#1088;, &#1089;&#1099;&#1075;&#1088;&#1072;&#1085;&#1085;&#1099;&#1093; &#1074;&#1072;&#1084;&#1080;. &#1069;&#1090;&#1086; &#1087;&#1088;&#1086;&#1089;&#1090;&#1072;&#1103; &#1087;&#1077;&#1088;&#1077;&#1084;&#1077;&#1085;&#1085;&#1072;&#1103;, &#1085;&#1072;&#1095;&#1080;&#1085;&#1072;&#1102;&#1097;&#1072;&#1103;&#1089;&#1103; &#1089; &#1077;&#1076;&#1080;&#1085;&#1080;&#1094;&#1099; &#1080; &#1091;&#1074;&#1077;&#1083;&#1080;&#1095;&#1080;&#1074;&#1072;&#1102;&#1097;&#1072;&#1103;&#1089;&#1103; &#1085;&#1072; &#1086;&#1076;&#1085;&#1091; &#1089; &#1082;&#1072;&#1078;&#1076;&#1086;&#1081; &#1085;&#1086;&#1074;&#1086;&#1081; &#1080;&#1075;&#1088;&#1086;&#1081;.</span></p><p class="c2 c4"><span class="c1"></span></p><p class="c2"><span class="c1">&#1055;&#1086;&#1076;&#1086;&#1073;&#1085;&#1086; &#1076;&#1080;&#1085;&#1072;&#1084;&#1080;&#1082;&#1077; &#1080;&#1075;&#1088;&#1099; &ldquo;&#1050;&#1072;&#1084;&#1077;&#1085;&#1100;, &#1085;&#1086;&#1078;&#1085;&#1080;&#1094;&#1099;, &#1073;&#1091;&#1084;&#1072;&#1075;&#1072;&rdquo;, &#1042;&#1072;&#1096;&#1072; &#1088;&#1091;&#1082;&#1072;, &#1053;&#1072;&#1096;&#1072; &#1088;&#1091;&#1082;&#1072; &#1080; &#1057;&#1095;&#1105;&#1090;&#1095;&#1080;&#1082; &#1080;&#1075;&#1088; &#1073;&#1091;&#1076;&#1091;&#1090; &#1088;&#1072;&#1079;&#1083;&#1080;&#1095;&#1072;&#1090;&#1100;&#1089;&#1103; &#1082;&#1072;&#1078;&#1076;&#1099;&#1081; &#1088;&#1072;&#1079;, &#1095;&#1090;&#1086; &#1087;&#1088;&#1080;&#1074;&#1077;&#1076;&#1105;&#1090; &#1082; &#1088;&#1072;&#1079;&#1085;&#1099;&#1084; &#1088;&#1077;&#1079;&#1091;&#1083;&#1100;&#1090;&#1072;&#1090;&#1072;&#1084;. &#1058;&#1072;&#1082;&#1080;&#1084; &#1086;&#1073;&#1088;&#1072;&#1079;&#1086;&#1084;, &#1089; &#1082;&#1072;&#1078;&#1076;&#1086;&#1081; &#1080;&#1075;&#1088;&#1086;&#1081; &#1091; &#1074;&#1072;&#1089; &#1073;&#1091;&#1076;&#1077;&#1090; &#1074;&#1086;&#1079;&#1084;&#1086;&#1078;&#1085;&#1086;&#1089;&#1090;&#1100; &#1086;&#1090;&#1082;&#1088;&#1099;&#1090;&#1100; &#1085;&#1086;&#1074;&#1099;&#1081; &#1087;&#1088;&#1077;&#1076;&#1084;&#1077;&#1090; &#1074; &#1082;&#1086;&#1088;&#1086;&#1073;&#1082;&#1077;, &#1082;&#1086;&#1090;&#1086;&#1088;&#1099;&#1081; &#1084;&#1099; &#1079;&#1072;&#1090;&#1077;&#1084; &#1091;&#1087;&#1072;&#1082;&#1091;&#1077;&#1084; &#1080; &#1086;&#1090;&#1087;&#1088;&#1072;&#1074;&#1080;&#1084; &#1074;&#1072;&#1084;.</span></p><p class="c2 c4"><span class="c0"></span></p><p class="c0"><span class="c0">&#1043;&#1077;&#1085;&#1077;&#1088;&#1072;&#1094;&#1080;&#1103;</span></p><p class="c2"><span class="c1">&#1050;&#1072;&#1078;&#1076;&#1099;&#1081; &#1087;&#1086;&#1090;&#1077;&#1085;&#1094;&#1080;&#1072;&#1083;&#1100;&#1085;&#1099;&#1081; &#1087;&#1088;&#1077;&#1076;&#1084;&#1077;&#1090; &#1080;&#1079; &#1082;&#1086;&#1088;&#1086;&#1073;&#1082;&#1080; &#1089;&#1074;&#1103;&#1079;&#1072;&#1085; &#1089; &#1085;&#1086;&#1084;&#1077;&#1088;&#1086;&#1084; &#1073;&#1088;&#1086;&#1089;&#1082;&#1072;, &#1096;&#1072;&#1085;&#1089;&#1099; &#1088;&#1072;&#1089;&#1087;&#1088;&#1077;&#1076;&#1077;&#1083;&#1077;&#1085;&#1099; &#1085;&#1072; 100,000,000 &#1085;&#1086;&#1084;&#1077;&#1088;&#1086;&#1074;. &#1050;&#1072;&#1078;&#1076;&#1099;&#1081; &#1073;&#1088;&#1086;&#1089;&#1086;&#1082; &#1086;&#1087;&#1088;&#1077;&#1076;&#1077;&#1083;&#1103;&#1077;&#1090;&#1089;&#1103; &#1082;&#1086;&#1084;&#1073;&#1080;&#1085;&#1072;&#1094;&#1080;&#1077;&#1081; &#1090;&#1088;&#1105;&#1093; &#1101;&#1083;&#1077;&#1084;&#1077;&#1085;&#1090;&#1086;&#1074;:</span></p><p class="c3"><span class="c0 c7">&#1057;&#1080;&#1076; &#1082;&#1083;&#1080;&#1077;&#1085;&#1090;&#1072;</span><span class="c1">: &#1101;&#1090;&#1086; &#1082;&#1086;&#1076;, &#1080;&#1089;&#1093;&#1086;&#1076;&#1103;&#1097;&#1080;&#1081; &#1086;&#1090; &#1074;&#1072;&#1089; &#1080; &#1074;&#1072;&#1096;&#1077;&#1075;&#1086; &#1073;&#1088;&#1072;&#1091;&#1079;&#1077;&#1088;&#1072;. </span></p><p class="c6"><span class="c0 c7">&#1057;&#1080;&#1076; &#1089;&#1077;&#1088;&#1074;&#1077;&#1088;&#1072;</span><span class="c1">: &#1101;&#1090;&#1086; &#1095;&#1088;&#1077;&#1079;&#1074;&#1099;&#1095;&#1072;&#1081;&#1085;&#1086; &#1076;&#1083;&#1080;&#1085;&#1085;&#1099;&#1081; &#1095;&#1080;&#1089;&#1083;&#1086;&#1074;&#1086;&#1081; &#1082;&#1086;&#1076;, &#1087;&#1088;&#1077;&#1076;&#1086;&#1089;&#1090;&#1072;&#1074;&#1083;&#1103;&#1077;&#1084;&#1099;&#1081; &#1085;&#1072;&#1084;&#1080;.</span></p><p class="c6"><span class="c0 c7">&#1057;&#1095;&#1105;&#1090;&#1095;&#1080;&#1082; &#1080;&#1075;&#1088;</span><span class="c1">: &#1101;&#1090;&#1086;&#1090; &#1092;&#1072;&#1082;&#1090;&#1086;&#1088; &#1087;&#1088;&#1086;&#1089;&#1090;; &#1086;&#1085; &#1087;&#1086;&#1082;&#1072;&#1079;&#1099;&#1074;&#1072;&#1077;&#1090; &#1082;&#1086;&#1083;&#1080;&#1095;&#1077;&#1089;&#1090;&#1074;&#1086; &#1080;&#1075;&#1088;, &#1089;&#1099;&#1075;&#1088;&#1072;&#1085;&#1085;&#1099;&#1093; &#1074;&#1072;&#1084;&#1080;. &#1044;&#1072;&#1078;&#1077; &#1077;&#1089;&#1083;&#1080; &#1091; &#1074;&#1072;&#1089; &#1073;&#1091;&#1076;&#1091;&#1090; &#1090;&#1077; &#1078;&#1077; &#1089;&#1080;&#1076;&#1099; &#1082;&#1083;&#1080;&#1077;&#1085;&#1090;&#1072; &#1080; &#1089;&#1077;&#1088;&#1074;&#1077;&#1088;&#1072;, &#1095;&#1090;&#1086; &#1080; &#1074; &#1087;&#1088;&#1077;&#1076;&#1099;&#1076;&#1091;&#1097;&#1077;&#1081; &#1080;&#1075;&#1088;&#1077;, &#1088;&#1077;&#1079;&#1091;&#1083;&#1100;&#1090;&#1072;&#1090; &#1089;&#1083;&#1077;&#1076;&#1091;&#1102;&#1097;&#1077;&#1081; &#1080;&#1075;&#1088;&#1099; &#1073;&#1091;&#1076;&#1077;&#1090; &#1086;&#1090;&#1083;&#1080;&#1095;&#1072;&#1090;&#1100;&#1089;&#1103; &#1080;&#1079;-&#1079;&#1072; &#1091;&#1074;&#1077;&#1083;&#1080;&#1095;&#1077;&#1085;&#1085;&#1086;&#1075;&#1086; &#1089;&#1095;&#1105;&#1090;&#1095;&#1080;&#1082;&#1072; &#1080;&#1075;&#1088;.</span></p><p class="c2 c4"><span class="c1"></span></p><p class="c2"><span class="c1">&#1055;&#1086;&#1089;&#1083;&#1077; &#1086;&#1090;&#1082;&#1088;&#1099;&#1090;&#1080;&#1103; &#1082;&#1086;&#1088;&#1086;&#1073;&#1082;&#1080; &#1074;&#1099; &#1091;&#1074;&#1080;&#1076;&#1080;&#1090;&#1077; &#1088;&#1072;&#1089;&#1096;&#1080;&#1092;&#1088;&#1086;&#1074;&#1072;&#1085;&#1085;&#1099;&#1081; &#1089;&#1080;&#1076; &#1089;&#1077;&#1088;&#1074;&#1077;&#1088;&#1072;, &#1082;&#1086;&#1090;&#1086;&#1088;&#1099;&#1081; &#1087;&#1086;&#1079;&#1074;&#1086;&#1083;&#1080;&#1090; &#1074;&#1072;&#1084; &#1087;&#1077;&#1088;&#1077;&#1087;&#1088;&#1086;&#1074;&#1077;&#1088;&#1080;&#1090;&#1100; &#1088;&#1077;&#1079;&#1091;&#1083;&#1100;&#1090;&#1072;&#1090;&#1099; &#1087;&#1088;&#1077;&#1076;&#1099;&#1076;&#1091;&#1097;&#1080;&#1093; &#1080;&#1075;&#1088;, &#1080;&#1089;&#1087;&#1086;&#1083;&#1100;&#1079;&#1086;&#1074;&#1072;&#1074;&#1096;&#1080;&#1093; &#1101;&#1090;&#1086;&#1090; &#1078;&#1077; &#1089;&#1080;&#1076;.</span></p><p class="c2 c4"><span class="c0"></span></p><p class="c2"><span class="c0">&#1042;&#1077;&#1088;&#1086;&#1103;&#1090;&#1085;&#1086;&#1089;&#1090;&#1100;</span></p><p class="c2"><span class="c1">&#1050;&#1072;&#1078;&#1076;&#1099;&#1081; &#1087;&#1088;&#1077;&#1076;&#1084;&#1077;&#1090; &#1080;&#1083;&#1080; &#1088;&#1077;&#1079;&#1091;&#1083;&#1100;&#1090;&#1072;&#1090; &#1089;&#1074;&#1103;&#1079;&#1072;&#1085; &#1089; &#1086;&#1087;&#1088;&#1077;&#1076;&#1077;&#1083;&#1105;&#1085;&#1085;&#1099;&#1084; &#1085;&#1086;&#1084;&#1077;&#1088;&#1086;&#1084; &#1073;&#1088;&#1086;&#1089;&#1082;&#1072;, &#1080; &#1074;&#1077;&#1088;&#1086;&#1103;&#1090;&#1085;&#1086;&#1089;&#1090;&#1100; &#1086;&#1087;&#1088;&#1077;&#1076;&#1077;&#1083;&#1105;&#1085;&#1085;&#1086;&#1075;&#1086; &#1088;&#1077;&#1079;&#1091;&#1083;&#1100;&#1090;&#1072;&#1090;&#1072; &#1086;&#1089;&#1090;&#1072;&#1105;&#1090;&#1089;&#1103; &#1085;&#1077;&#1080;&#1079;&#1084;&#1077;&#1085;&#1085;&#1086;&#1081;, &#1085;&#1077;&#1079;&#1072;&#1074;&#1080;&#1089;&#1080;&#1084;&#1086; &#1086;&#1090; &#1082;&#1086;&#1083;&#1080;&#1095;&#1077;&#1089;&#1090;&#1074;&#1072; &#1074;&#1072;&#1096;&#1080;&#1093; &#1080;&#1075;&#1088;, &#1076;&#1072;&#1078;&#1077; &#1077;&#1089;&#1083;&#1080; &#1074;&#1099; &#1089;&#1099;&#1075;&#1088;&#1072;&#1077;&#1090;&#1077; 100,000,000 &#1088;&#1072;&#1079;. &#1053;&#1077; &#1089;&#1091;&#1097;&#1077;&#1089;&#1090;&#1074;&#1091;&#1077;&#1090; &#1085;&#1080;&#1082;&#1072;&#1082;&#1086;&#1081; &#1079;&#1072;&#1082;&#1086;&#1085;&#1086;&#1084;&#1077;&#1088;&#1085;&#1086;&#1089;&#1090;&#1080; &#1080;&#1083;&#1080; &#1089;&#1090;&#1088;&#1072;&#1090;&#1077;&#1075;&#1080;&#1080;, &#1086;&#1087;&#1088;&#1077;&#1076;&#1077;&#1083;&#1103;&#1102;&#1097;&#1077;&#1081;, &#1082;&#1086;&#1075;&#1076;&#1072; &#1073;&#1091;&#1076;&#1091;&#1090; &#1074;&#1099;&#1080;&#1075;&#1088;&#1072;&#1085;&#1099; &#1073;&#1086;&#1083;&#1077;&#1077; &#1094;&#1077;&#1085;&#1085;&#1099;&#1077; &#1087;&#1088;&#1077;&#1076;&#1084;&#1077;&#1090;&#1099;; &#1101;&#1090;&#1086; &#1087;&#1086;&#1083;&#1085;&#1086;&#1089;&#1090;&#1100;&#1102; &#1089;&#1083;&#1091;&#1095;&#1072;&#1081;&#1085;&#1086;&#1089;&#1090;&#1100;.</span></p><p class="c2 c4"><span class="c0"></span></p><p class="c0"><span class="c0">&#1053;&#1077;&#1079;&#1072;&#1074;&#1080;&#1089;&#1080;&#1084;&#1072;&#1103; &#1087;&#1088;&#1086;&#1074;&#1077;&#1088;&#1082;&#1072;</span></p><p class="c2"><span class="c1">&#1042;&#1099; &#1084;&#1086;&#1078;&#1077;&#1090;&#1077; &#1087;&#1088;&#1086;&#1074;&#1077;&#1088;&#1080;&#1090;&#1100; &#1095;&#1077;&#1089;&#1090;&#1085;&#1086;&#1089;&#1090;&#1100; &#1082;&#1072;&#1078;&#1076;&#1086;&#1075;&#1086; &#1088;&#1072;&#1091;&#1085;&#1076;&#1072;, &#1079;&#1072;&#1081;&#1076;&#1103; &#1074; &#1080;&#1089;&#1090;&#1086;&#1088;&#1080;&#1102; &#1080;&#1075;&#1088; &#1080; &#1089;&#1082;&#1086;&#1087;&#1080;&#1088;&#1086;&#1074;&#1072;&#1074; &#1085;&#1086;&#1084;&#1077;&#1088; &#1088;&#1072;&#1091;&#1085;&#1076;&#1072;, &#1089;&#1080;&#1076; &#1082;&#1083;&#1080;&#1077;&#1085;&#1090;&#1072; &#1080; &#1089;&#1080;&#1076; &#1089;&#1077;&#1088;&#1074;&#1077;&#1088;&#1072;.</span></p><p class="c2"><span class="c1">&#1061;&#1101;&#1096;&#1080;&#1088;&#1086;&#1074;&#1072;&#1085;&#1085;&#1072;&#1103; &#1074;&#1077;&#1088;&#1089;&#1080;&#1103; &#1082;&#1086;&#1084;&#1073;&#1080;&#1085;&#1080;&#1088;&#1086;&#1074;&#1072;&#1085;&#1085;&#1086;&#1075;&#1086; &#1089;&#1080;&#1076;&#1072; &#1076;&#1086;&#1089;&#1090;&#1091;&#1087;&#1085;&#1072; &#1087;&#1091;&#1073;&#1083;&#1080;&#1095;&#1085;&#1086;.</span></p><p class="c2"><span class="c1">&#1058;&#1086;&#1095;&#1085;&#1086;&#1089;&#1090;&#1100; &#1093;&#1101;&#1096;&#1072; &#1084;&#1086;&#1078;&#1085;&#1086; &#1087;&#1088;&#1086;&#1074;&#1077;&#1088;&#1080;&#1090;&#1100; &#1089; &#1087;&#1086;&#1084;&#1086;&#1097;&#1100;&#1102; &#1083;&#1102;&#1073;&#1086;&#1075;&#1086; &#1086;&#1085;&#1083;&#1072;&#1081;&#1085;-&#1082;&#1072;&#1083;&#1100;&#1082;&#1091;&#1083;&#1103;&#1090;&#1086;&#1088;&#1072;.</span></p><p class="c2 c4"><span class="c8"></span></p></>
            ) : (<></>)
          }
        </div>
        <LiveAnbox />
      </div>
      <Footer></Footer>
    </div>
  )
};

export default ProvablyFair;
