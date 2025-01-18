/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { transactionsGet } from "../../redux/actions/transactionsgetAction";
import { logoutGet } from "../../redux/actions/logoutAction";
import { userGet } from "../../redux/actions/usergetAction";
import { useredit } from "../../redux/actions/userEditAction";

import { balanceget } from "../../redux/actions/balanceGetAction";
import { depositlink } from "../../redux/actions/depositAction";
import { loginPost } from "../../redux/actions/loginAction";
import { signPost } from "../../redux/actions/signAction";

import Account from "../../components/Account/Account";

import Footer from "../../components/Footer/Footer";

import StickyMenuLogInOptions from "../../components/StickyMenuLogInOptions/StickyMenuLogInOptions";
import StickyMenuTop from "../../components/StickyMenuTop/StickyMenuTop";
import DepositPopup from "../../components/DepositPopup/DepositPopup";
import WithdrawPopup from "../../components/WithdrawPopup/WithdrawPopup";
import LoginPopup from "../../components/LoginPopup/LoginPopup";
import SignUpPopup from "../../components/SignUpPopup/SignUpPopup";
import History from "../../components/History/History";
import SuccessReq from "../../components/SuccessReq/SuccessReq";

var hdata = [
  { ts: "-", id: "Not Logged In", type: "-", amount: "-"},
];
var defaultUser = {
  email: "",
  password: "",
  name: "",
  lastName: "",
  code: "",
  address: "",
  country: "",
  state: "",
  city: "",
  address_2: "",
  phoneNumber: "",
};

function AccountPage() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.example.loading);
  const characters = useSelector((state) => state.example.payload);
  const payloadType = useSelector((state) => state.example.payloadType);

  const [loggedIn, setLoggedIn] = React.useState(true);
  const [showDepositPopup, setShowDP] = React.useState(false);
  const [showWithdrawalPopup, setShowWP] = React.useState(false);
  const [showSignUpPopup, setShowSUP] = React.useState(false);
  const [showLoginPopup, setShowLP] = React.useState(false);
  const [showStickyMenuLogInOptions, setShowSMLIO] = React.useState(true);
  const [isHistory, setIH] = React.useState(false);
  const [balance, setBalance] = React.useState("0.00");
  const [updater, setUpdater] = React.useState(0);
  const [isSignError, setIsSignError] = React.useState(false);
  const [isLoginError, setIsLoginError] = React.useState(false);

  const [bonusBoxes, setBonusBoxes] = React.useState([]);

  const [isDepositing, setIsDepositing] = React.useState(false);
  const [showSuccessReqPopup, setShowSRP] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');

  const toggleHistory = () => {
    setIH(!isHistory);
  };

  const onDeposit = (amount) => {
    dispatch(depositlink(amount));
    setIsDepositing(true);
  };

  const toggleSMLIO = () => {
    setShowSMLIO(!showStickyMenuLogInOptions);
  };

  const toggleDP = () => {
    //window.location.href='https://buy.stripe.com/fZecPK7C1dmr70kfZ0'
    setShowDP(!showDepositPopup);
    //toggleSMLIO();
  };
  const toggleWP = () => {
    setShowWP(!showWithdrawalPopup);
    toggleSMLIO();
  };

  const toggleSUP = () => {
    setShowSUP(!showSignUpPopup);
    setShowLP(false);
  };

  const toggleLP = () => {
    setShowLP(!showLoginPopup);
    setShowSUP(false);
  };

  const logOut = () => {
    dispatch(logoutGet());
  };

  const handleLogin = (username, password) => {
    dispatch(loginPost(username, password));
  };

  const handleGoogleLogin = () => {
    window.location.href = window.clientConfig.url+"/google_auth";
  };
  const handleSignUp = (username, password) => {
    dispatch(signPost(username, password));
  };

  const handleEdit = (email, password, shippingAddress) => {
    dispatch(
      useredit(
        email === undefined ? "" : email,
        password === undefined ? "" : password,
        shippingAddress === undefined ? [] : shippingAddress
      )
    );
    console.log(shippingAddress);
    defaultUser.name =
      shippingAddress.name === undefined ? "" : shippingAddress.name;
    defaultUser.lastName =
      shippingAddress.lastName === undefined ? "" : shippingAddress.lastName;
    defaultUser.address =
      shippingAddress.address === undefined ? "" : shippingAddress.address;
    defaultUser.country =
      shippingAddress.country === undefined ? "" : shippingAddress.country;
    defaultUser.state =
      shippingAddress.state === undefined ? "" : shippingAddress.state;
    defaultUser.city =
      shippingAddress.city === undefined ? "" : shippingAddress.city;
    defaultUser.code =
      shippingAddress.code === undefined ? "" : shippingAddress.code;
    defaultUser.address_2 =
      shippingAddress.address_2 === undefined ? "" : shippingAddress.address_2;
    defaultUser.phoneNumber =
      shippingAddress.phoneNumber === undefined
        ? ""
        : shippingAddress.phoneNumber;
    localStorage.setItem("shippingAdress", JSON.stringify(shippingAddress));
  };

  useEffect(() => {
    dispatch(transactionsGet());
  }, [dispatch]);

  useEffect(() => {
    dispatch(userGet());
  }, [dispatch]);

  useEffect(() => {
    if (characters[0] == "NotLoggedIn") {
      console.log("NotLoggedIn");
      hdata = [
        { ts: "-", id: "Not Logged In", type: "-", amount: "-"},
      ];
      defaultUser = {
        email: "",
        password: "",
        name: "",
        lastName: "",
        address: "",
        country: "",
        state: "",
        city: "",
        code: "",
        address_2: "",
        phoneNumber: "",
      };
    } else {
      if (payloadType == "userGet") {
        console.log("userInfo", characters);
        defaultUser.email =
          defaultUser.email === undefined ? "" : characters.email;
        defaultUser.password =
          defaultUser.password === undefined ? "" : characters.password;
        setUpdater("UPDATE PLEASE");
        try {
          defaultUser.name =
            defaultUser.name === undefined
              ? ""
              : characters.shipping_address.name;
          defaultUser.lastName =
            defaultUser.lastName === undefined
              ? ""
              : characters.shipping_address.lastName;
          defaultUser.address =
            defaultUser.address === undefined
              ? ""
              : characters.shipping_address.address;
          defaultUser.country =
            defaultUser.country === undefined
              ? ""
              : characters.shipping_address.country;
          defaultUser.state =
            defaultUser.state === undefined
              ? ""
              : characters.shipping_address.state;
          defaultUser.city =
            defaultUser.city === undefined
              ? ""
              : characters.shipping_address.city;
          console.log(characters.shipping_address.code);
          defaultUser.code =
            defaultUser.code === undefined
              ? ""
              : characters.shipping_address.code;

          defaultUser.address_2 =
            defaultUser.address_2 === undefined
              ? ""
              : characters.shipping_address.address_2;
          defaultUser.phoneNumber =
            defaultUser.phoneNumber === undefined
              ? ""
              : characters.shipping_address.phoneNumber;
          localStorage.setItem("shippingAdress", JSON.stringify(defaultUser));
        } catch (e) { /* empty */ }
      } else if (payloadType == "transactionsGet") {
        console.log("Transactions");
        hdata = characters;
        console.log(
          "sortedHistory:",
          hdata.sort(function (a, b) {
            return a.ts > b.ts ? -1 : 1;
          })
        );
      }
      if (payloadType == "BALANCE_GET") {
        setLoggedIn(true);
        console.log("balance", characters.balance);
        console.log("bonusBoxes", characters);

        setBonusBoxes(characters.bonus_boxes);
        setBalance(characters.balance);
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
      } else if (payloadType == "LOGIN_GOOGLE") {
        setLoggedIn(true);
        console.log("info", characters.balance);
        console.log("balance", characters.balance);
        setBalance(characters.balance);
      } else {
        console.log("Unknown Payload");
      }
    }
  }, [loading, characters]);
  if (!loading && isDepositing&& characters.url!=undefined) {
    
    localStorage.setItem('depositUrlLog',characters)
    window.location.href = characters.url;
    setIsDepositing(false);
  }

  useEffect(() => {
    dispatch(balanceget());
    const intervalId = setInterval(() => {
      dispatch(balanceget());
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

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
      {loading ? (
        <div> Загрузка...</div>
      ) : (
        <div style={{ backgroundColor: "#f0f0f0" }}>
          <StickyMenuTop
            openBonusBox={() => {
              window.location.href = "/";
            }}
            toggleLP={toggleLP}
            bonusBoxes={bonusBoxes}
            balance={balance}
            toggleDP={toggleDP}
            toggleSP={toggleSUP}
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
              handleLoginGoogle={handleGoogleLogin}
              isError={isSignError}
              openLoginPopup={switchToLP}
              handleSignUp={handleSignUp}
              closePopup={toggleSUP}
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
            <WithdrawPopup togglePopup={toggleWP} openSRP={()=>{setShowSRP(true); setSuccessMessage('withdrawMoney')} } balance={balance}/>
          ) : (
            <></>
          )}
          {loggedIn ? (
            <></>
          ) : (
            <StickyMenuLogInOptions
              googleLogin={handleGoogleLogin}
              logIn={toggleLP}
              signUp={toggleSUP}
            />
          )}
          {isHistory ? (
            <History
              openAccount={toggleHistory}
              openWithdraw={toggleWP}
              historyData={hdata}
            />
          ) : (
            <></>
          )}
          {isHistory ? (
            <></>
          ) : (
            <Account
              updater={updater}
              userEdit={handleEdit}
              defaultUser={defaultUser}
              logout={logOut}
              openHistory={toggleHistory}
              openWithdraw={toggleWP}
            />
          )}
            <Footer></Footer>
            {showSuccessReqPopup ? (<SuccessReq successMessage={successMessage} closePopup={() => setShowSRP(false)}></SuccessReq>) : (<></>)}
        </div>
      )}
    </div>
  );
}

export default AccountPage;
