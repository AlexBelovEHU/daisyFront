/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { depositlink } from "../../redux/actions/depositAction";
import { loginPost } from "../../redux/actions/loginAction";
import { signPost } from "../../redux/actions/signAction";
import { allboxes } from "../../redux/actions/allboxesAction";
import { balanceget } from "../../redux/actions/balanceGetAction";
import { useNavigate, useLocation } from "react-router-dom";

import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";

import StickyMenuLogInOptions from "../../components/StickyMenuLogInOptions/StickyMenuLogInOptions";
import StickyMenuTop from "../../components/StickyMenuTop/StickyMenuTop";
import DepositPopup from "../../components/DepositPopup/DepositPopup";
import WithdrawPopup from "../../components/WithdrawPopup/WithdrawPopup";
import LoginPopup from "../../components/LoginPopup/LoginPopup";
import SignUpPopup from "../../components/SignUpPopup/SignUpPopup";
import NoFreeBoxesPopup from "../../components/NoFreeBoxesPopup/NoFreeBoxesPopup";
import LoadingView from "../../components/LoadingView/LoadingView";

function MainPage() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.example.loading);
  const [loadedFirstBoxes, setLoadedFirstBoxes] = React.useState(false)

  const characters = useSelector((state) => state.example.payload);
  const payloadType = useSelector((state) => state.example.payloadType);
  const [featuredboxes, setBoxes] = React.useState([]);
  const [currentPage, setPage] = React.useState(1);

  const [currentBanner, setCurrentBanner] = React.useState(1);
  const [balance, setBalance] = React.useState("0.00");
  const [bonusBoxes, setBonusBoxes] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [currentBoxesnum] = React.useState(12);
  const [showDepositPopup, setShowDP] = React.useState(false);
  const [showWithdrawalPopup, setShowWP] = React.useState(false);
  const [showSignUpPopup, setShowSUP] = React.useState(false);
  const [showLoginPopup, setShowLP] = React.useState(false);
  const [showNFBP, setShowNFBP] = React.useState(false);
  const [isDepositing, setIsDepositing] = React.useState(false);
  const [showSMLIO, setShowSMLIO] = React.useState(true);
  const [isSignError, setIsSignError] = React.useState(false);
  const [isLoginError, setIsLoginError] = React.useState(false);
  const [isFloatingVisible, setIsFloatingVisible] = React.useState(true);

  const [ticking] = React.useState(true),
    [count, setCount] = React.useState(0);

  const footerHeightVH = 50;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;

      if (
        scrollPosition >=
        pageHeight - window.innerHeight * (footerHeightVH / 100)
      ) {
        setIsFloatingVisible(false);
      } else {
        setIsFloatingVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => ticking && setCount(count + 1), 5000);
    switchBanner();
    return () => clearTimeout(timer);
  }, [count, ticking]);

  const increaseBoxesnum = () => {
    window.location.href = "/allboxes";
  };

  const toggleSMLIO = () => {
    setShowSMLIO(!showSMLIO);
  };

  const toggleDP = () => {
    //window.location.href = 'https://buy.stripe.com/fZecPK7C1dmr70kfZ0'
    setShowDP(!showDepositPopup);
  };
  const toggleWP = () => {
    setShowWP(!showWithdrawalPopup);
  };

  const toggleSUP = () => {
    setShowSUP(!showSignUpPopup);
    setShowLP(false);
    toggleSMLIO();
  };

  const toggleLP = () => {
    setShowLP(!showLoginPopup);
    setShowSUP(false);
    toggleSMLIO();
  };

  const switchBanner = () => {
    setCurrentBanner(currentBanner + 1);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const openBonusBox = () => {
    console.log("location", location.pathname);
    const targetPath = `/box/${bonusBoxes[0]}`;
    if (location.pathname === targetPath) {
      console.log("Already on the target box page.");
      return;
    }
    if (bonusBoxes.length != 0) {
      navigate(`/box/${bonusBoxes[0]}`);

      // localStorage.setItem("currentBoxInfo", JSON.stringify(boxinfo));
      // console.log("MAINPAGEBOX", boxinfo);
      // window.location.href = `/box/${boxinfo.id}`;
    } else {
      if(showNFBP!=true){
        setShowNFBP(true);
      }
    }
  };

  const handleLogin = (username, password) => {
    dispatch(loginPost(username, password));
    //setShowLP(false)
    //setShowSMLIO(false)
    //setLoggedIn(true)
  };

  const handleGoogleLogin = () => {
    window.location.href = window.clientConfig.url + "/google_auth";
  };

  const handleSignUp = (username, password) => {
    dispatch(signPost(username, password));
    //setShowLP(false)
    //setShowSMLIO(false)
    //setLoggedIn(true)
  };

  const onDeposit = (amount) => {
    dispatch(depositlink(amount));
    setIsDepositing(true);
  };

  if (!loading && isDepositing && characters.url != undefined) {

    localStorage.setItem('depositUrlLog', characters)
    window.location.href = characters.url;
    setIsDepositing(false);
  }

  useEffect(() => {
    dispatch(allboxes(0));
  }, [dispatch]);

  useEffect(() => {
    dispatch(balanceget());
    const intervalId = setInterval(() => {
      dispatch(balanceget());
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (characters[0] == "NotLoggedIn") {
      console.log("NotLoggedIn");
      setLoggedIn(false);
    } else {
      if (payloadType == "BALANCE_GET") {
        setLoggedIn(true);
        console.log("balance", characters);

        setBonusBoxes(characters.bonus_boxes);
        setBalance(characters.balance);
      } else if (payloadType == "GET_ALLBOXES") {
        setLoadedFirstBoxes(true)
        if (characters.length != 0) {
          setBoxes(featuredboxes.concat(characters));

          let bronze = JSON.stringify(
            characters.filter(function (item) {
              return item.id == window.clientConfig.bronzeBoxId;
            })
          );
          if (bronze != []) {
            localStorage.setItem("bronzeBox", bronze);
          }
          let silver = JSON.stringify(
            characters.filter(function (item) {
              return item.id == window.clientConfig.silverBoxId;
            })
          );
          if (silver != []) {
            localStorage.setItem("silverBox", silver);
          }
          let gold = JSON.stringify(
            characters.filter(function (item) {
              return item.id == window.clientConfig.goldBoxId;
            })
          );
          if (gold != []) {
            localStorage.setItem("goldBox", gold);
          }

          console.log("featured boxes", featuredboxes);
          console.log(currentPage);
          console.log("boxes", characters);

          setPage(currentPage + 1);
          dispatch(allboxes(currentPage));
        } else {
          console.log("No more boxes");
        }
      } else if (payloadType == "LOGIN") {
        if (characters == "ErrorIncorrectPassword") {
          setIsLoginError(true);
        } else {
          setLoggedIn(true);
          console.log("info", characters.balance);
          console.log("balance", characters.balance);
          setBalance(characters.balance);
          setShowLP(false);
        }
      } else if (payloadType == "SIGN") {
        if (characters == "userexists422") {
          setIsSignError(true);
        } else {
          setLoggedIn(true);
          console.log("info", characters.balance);
          console.log("balance", characters.balance);
          setBalance(characters.balance);
          setShowSUP(false);
        }
      } else {
        console.log("Unknown Payload");
      }
    }
  }, [loading, characters, payloadType]);

  const switchToSUP = () => {
    setShowLP(false);
    setShowSUP(true);
  };
  const switchToLP = () => {
    setShowLP(true);
    setShowSUP(false);
  };
  return (
    <div className="content-component__wrapper">
      {!loadedFirstBoxes ? (
        <LoadingView></LoadingView>
      ) : (
        <div style={{ backgroundColor: "#f0f0f0" }}>
          <StickyMenuTop
            openBonusBox={openBonusBox}
            toggleLP={toggleLP}
            toggleSP={toggleSUP}
            bonusBoxes={bonusBoxes}
            balance={balance}
            toggleDP={toggleDP}
            toggleWP={toggleWP}
            isloggedIn={loggedIn}
          />
          {showLoginPopup ? (
            <LoginPopup
              isError={isLoginError}
              openSignPopup={switchToSUP}
              handleLoginGoogle={handleGoogleLogin}
              handleLogin={handleLogin}
              closePopup={toggleLP}
            />
          ) : (
            <></>
          )}
          {showSignUpPopup ? (
            <SignUpPopup
              isError={isSignError}
              openLoginPopup={switchToLP}
              handleSignUp={handleSignUp}
              closePopup={toggleSUP}
              handleLoginGoogle={handleGoogleLogin}
            />
          ) : (
            <></>
          )}
          {showDepositPopup ? (
            <DepositPopup
              onDeposit={onDeposit}
              togglePopup={toggleDP}
            ></DepositPopup>
          ) : (
            <></>
          )}
          {showWithdrawalPopup ? (
            <WithdrawPopup togglePopup={toggleWP} />
          ) : (
            <></>
          )}
          {loggedIn || !showSMLIO
            ? null
            : isFloatingVisible && (
              <StickyMenuLogInOptions
                googleLogin={handleGoogleLogin}
                logIn={toggleLP}
                signUp={toggleSUP}
              />
            )}
          <Main
            switchBanner={switchBanner}
            onshowmore={increaseBoxesnum}
            boxesnum={currentBoxesnum}
            currentBanner={currentBanner}
            featuredboxes={featuredboxes}
            isLoggedIn={loggedIn}
            showDP={toggleDP}
            showLogin={toggleLP}
          />{" "}
          <Footer />
          {showNFBP ? (
            <NoFreeBoxesPopup
              closePopup={() => setShowNFBP(false)}
              toggleDP={toggleDP}
            ></NoFreeBoxesPopup>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}

export default MainPage;
