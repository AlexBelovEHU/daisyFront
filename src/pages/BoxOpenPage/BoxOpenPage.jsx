/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import BoxPage1 from "../../components/BoxPage/BoxPage1";
import "../../components/StickyMenuTop/StickyMenuTop";
import StickyMenuTop from "../../components/StickyMenuTop/StickyMenuTop";
import StickyMenuLogInOptions from "../../components/StickyMenuLogInOptions/StickyMenuLogInOptions";
import ItemWonPopup from "../../components/ItemWonPopup/ItemWonPopup";
import ItemActWon from "../../components/ItemActWonPopup/ItemActWon";
import Footer from "../../components/Footer/Footer";
import LoginPopup from "../../components/LoginPopup/LoginPopup";
import SignUpPopup from "../../components/SignUpPopup/SignUpPopup";
import SuccessReq from "../../components/SuccessReq/SuccessReq";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { newSeed } from "../../redux/actions/newSeedAction";
import { playGame } from "../../redux/actions/gamePlayAction";
import { balanceget } from "../../redux/actions/balanceGetAction";
import { depositlink } from "../../redux/actions/depositAction";
import { loginPost } from "../../redux/actions/loginAction";
import { signPost } from "../../redux/actions/signAction";
import { sellItem } from "../../redux/actions/ItemSellAction";
import { withdrawalReq } from "../../redux/actions/withdrawalRequest";
import { userGet } from "../../redux/actions/usergetAction";
import { allboxes } from "../../redux/actions/allboxesAction";

import DepositPopup from "../../components/DepositPopup/DepositPopup";
import WithdrawPopup from "../../components/WithdrawPopup/WithdrawPopup";

import testImg from "../../assets/cord.png";
import ShippingPopup from "../../components/ShippingPopup/ShippingPopup";

const BoxOpenPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.example.loading);

  const characters = useSelector((state) => state.example.payload);
  const payloadType = useSelector((state) => state.example.payloadType);

  const emptyUser = {
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
  const [showSuccessReqPopup, setShowSRP] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');
  const [showDepositPopup, setShowDP] = React.useState(false);
  const [showWithdrawalPopup, setShowWP] = React.useState(false);
  const [showSignUpPopup, setShowSUP] = React.useState(false);
  const [showLoginPopup, setShowLP] = React.useState(false);
  const [showShippingPopup, setShowSP] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [showItemWon, setShowItemWon] = React.useState(false);
  const [itemActWon, setItemActWon] = React.useState(null);
  const [showItemActWon, setShowItemActWon] = React.useState(false);
  const [balance, setBalance] = React.useState("0.00");
  const [winner, setWinner] = React.useState(null);
  const [gameIter, setGameIter] = React.useState(0);
  const [featuredboxes, setBoxes] = React.useState([]);
  const [currentPage, setPage] = React.useState(1);
  const [wasFree, setWasFree] = React.useState(true);
  const [triggerOpenBoxPopup, setTOBP] = React.useState(false);

  const [isSignError, setIsSignError] = React.useState(false);
  const [isLoginError, setIsLoginError] = React.useState(false);
  const [bonusBoxes, setBonusBoxes] = React.useState([]);

  const [isDepositing, setIsDepositing] = React.useState(false);
  const [hashSeed, setHashSeed] = React.useState(null);
  const [nonce, setNonce] = React.useState(null);
  const [prizeInInventory, setPrizeInInventory] = React.useState({});
  const [showItemActWonPopup, setShowIAWP] = React.useState(false);
  const [forceUpdate, setForceUpdate] = React.useState(false);
  const [fetchloading, setLoading] = React.useState(false);

  const { box_id } = useParams();


  useEffect(()=>{
    setLoading(true)
    console.log("Box list", featuredboxes);
    const boxFound = featuredboxes.find((box) => box.id === parseInt(box_id, 10));
    if (boxFound) {
      setForceUpdate(!forceUpdate);
      localStorage.setItem("currentBoxInfo", JSON.stringify(boxFound));
      setBoxInfo(boxFound)
      setLoading(false);
      setForceUpdate(!forceUpdate);
    } else {
      setLoading(false);
      console.log("Box not found on this page");
    }

  },[featuredboxes])



  const [itemsget, setItemsGet] = React.useState([]);
  const [boxInfo, setBoxInfo] = React.useState(null);

  useEffect(() => {
    try {
      const currentBoxInfo = JSON.parse(localStorage.getItem("currentBoxInfo"));
      setBoxInfo(currentBoxInfo);
      console.log("Box price: " + currentBoxInfo?.price);

      if (currentBoxInfo?.prizes) {
        const updatedItems = currentBoxInfo.prizes.map((prize, i) => {
          const rarities = ["red", "yellow", "grey", "pink"];
          const rarity = rarities[i % rarities.length];

          const newItem = {
            name: prize.name,
            rarity: rarity,
            image: prize.image,
            price: prize.price,
            id: prize.prize_id,
            probability: prize.odd,
            description: prize.description,
          };

          return newItem;
        });

        setItemsGet(updatedItems);
      } else {
        console.log("No items rn fr fr");
      }
    } catch {
      console.log("No boxes rn fr fr");
    }

    console.log("Current items:", itemsget);
  }, [box_id, forceUpdate]);

  const [itemWon, setItemWon] = React.useState({
    probability: "0-199",
    image: testImg,
    price: "34,56$",
    name: "First timer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim",
  });

  const incIter = () => {
    setGameIter(gameIter + 1);
  };

  const SetItemInfo = (item) => {
    setItemWon(item);
    setShowItemWon(true);
  };

  const clearTrigger = () => {
    setTOBP(false);
  };

  const getHashSeed = () => {
    console.log("getting new seed");
    dispatch(newSeed());
  };
  const onDeposit = (amount) => {
    dispatch(depositlink(amount));
    setIsDepositing(true);
  };

  const onPlayGame = (seedHash, nonce, clientSeed, lootboxId, wb) => {
    dispatch(playGame(seedHash, nonce, clientSeed, lootboxId, wb));
  };

  const check = () => {
    let res = true;
    Object.keys(emptyUser).forEach((key) => {
      console.log(
        emptyUser[key],
        JSON.parse(localStorage.getItem("shippingAdress"))[key]
      );
      try {
        if (
          emptyUser[key] ==
            JSON.parse(localStorage.getItem("shippingAdress"))[key] ||
          JSON.parse(localStorage.getItem("shippingAdress"))[key] == undefined
        ) {
          console.log(key, " is not filled");
          res = false;
        } else {
          console.log(
            emptyUser[key],
            JSON.parse(localStorage.getItem("shippingAdress"))[key]
          );
        }
      } catch {
        console.log("somethin went wrong");
        res = false;
      }
    });
    return res;
  };

  useEffect(() => {
    dispatch(userGet());
  }, [dispatch]);
  useEffect(() => {
    dispatch(allboxes(currentPage));
  }, [dispatch]);

  useEffect(() => {
    if (characters[0] == "NotLoggedIn") {
      console.log("NotLoggedIn");
      setLoggedIn(false);
    } else {
      if (payloadType == "userGet") {
        console.log("userInfo", characters);
        defaultUser.email =
          defaultUser.email === undefined ? "" : characters.email;
        defaultUser.password =
          defaultUser.password === undefined ? "" : characters.password;
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
      } else if (payloadType == "BALANCE_GET") {
        setLoggedIn(true);
        console.log("balance", characters.balance);
        console.log("bonusBoxes", characters);
        let prizes_in_inventory = characters.prizes_in_inventory;
        if (prizes_in_inventory.length != 0) {
          prizes_in_inventory[0].id = prizes_in_inventory[0].prize_id;
          setPrizeInInventory(prizes_in_inventory[0]);
          setShowIAWP(true);
        }
        setBonusBoxes(characters.bonus_boxes);
        setBalance(characters.balance);
      } else if (payloadType == "NEW_SEED") {
        setLoggedIn(true);
        setHashSeed(characters.hash);
        setNonce(characters.nonce);
        console.log("new seed", hashSeed, nonce);
      } else if (payloadType == "LOGIN") {
        if (characters == "ErrorIncorrectPassword") {
          setIsLoginError(true);
        } else {
          dispatch(newSeed());
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
        console.log("balance", characters.balance.balance);
        setBalance(characters.balance.balance);
      } else if (payloadType == "GET_ALLBOXES") {
        console.log(currentPage);
        console.log("boxes", characters);
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
          dispatch(allboxes(currentPage+1));
          setPage(currentPage + 1);
        } else {
          console.log("No more boxes");
        }
      } else if (payloadType == "GAME_PLAY") {
        // setForceUpdate(!forceUpdate);
        if (characters == "Error") {
          alert("Something went wrong while opening the box");
          setWinner("");
          setWinner("Error");
          incIter();
        } else {
          console.log("You won id:", characters.outcome.prize_id);
          console.log("All prizes:", itemsget);
          console.log("BoxInfo", boxInfo);
          console.log(
            "You won:",
            itemsget.find((item) => item.id == characters.outcome.prize_id)
          );
          var winItem = itemsget.find(
            (item) => item.id == characters.outcome.prize_id
          );
          winItem.iter = gameIter;
          incIter();
          setWinner(JSON.stringify(winItem));
          setItemActWon(winItem);
        }
      } else if (payloadType == "ITEM_SELL") {
        console.log(characters);
        setBalance(characters.balance);
      } else if (payloadType == "USER_EDIT") {
        alert("OH SHIT USER EDIT");
      } else {
        console.log(characters);
        console.log("Unknown Payload");
      }
    }
  }, [loading, characters]);

  const toggleDP = () => {
    //window.location.href='https://buy.stripe.com/fZecPK7C1dmr70kfZ0'
    setShowDP(!showDepositPopup);
  };
  const toggleIAW = () => {
    setShowItemActWon(!ItemActWon);
  };
  const toggleWP = () => {
    setShowWP(!showWithdrawalPopup);
  };
  if (!loading && isDepositing&& characters.url!=undefined) {
    
    localStorage.setItem('depositUrlLog',characters)
    window.location.href = characters.url;
    setIsDepositing(false);
  }

  const toggleSUP = () => {
    setShowSUP(!showSignUpPopup);
    setShowLP(false);
  };

  const toggleLP = () => {
    setShowLP(!showLoginPopup);
    setShowSUP(false);
  };

  useEffect(() => {
    dispatch(balanceget());
  }, []);

  const toggleItemsWon = () => {
    setShowItemWon(!showItemWon);
  };

  const handleLogin = (username, password) => {
    dispatch(loginPost(username, password));
  };

  const handleGoogleLogin = () => {
    window.location.href = window.clientConfig.url + "/google_auth";
  };
  const handleSignUp = (username, password) => {
    dispatch(signPost(username, password));
  };

  const onWin = () => {
    setShowItemActWon(true);
  };

  const onSell = (itemId) => {
    console.log(itemId);
    setShowItemActWon(false);
    setShowSP(false);
    dispatch(sellItem(itemId));
    setShowSRP(true);
    setSuccessMessage('sell')
    setShowIAWP(false);
  };

  const onWithdrawal = (itemId) => {
    if (check()) {
      dispatch(withdrawalReq(itemId, "withdrawal", {}));
      setShowItemActWon(false);
      setShowSP(false);
      setShowSRP(true);
      setSuccessMessage('withdraw')
      setShowIAWP(false);
    } else {
      if (!showShippingPopup) {
        setShowSP(true);
      }
    }
  };
  const switchToSUP = () => {
    setShowLP(false);
    setShowSUP(true);
  };
  const switchToLP = () => {
    setShowLP(true);
    setShowSUP(false);
  };
  const decreaseBalance = (amount) => {
    setBalance(balance - amount);
    console.log("UPDATING THWE BALANCE", balance);
  };
  const onSignUpNow = () => {
    setShowItemActWon(false);
    setShowSUP(true);
  };

  const onFreeBoxDeposit = () => {
    setShowDP(true);
    setShowItemActWon(false);
  };

  if (fetchloading) {
    return (
      <div
        style={{
          padding: "20px",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: "18px", fontWeight: "bold" }}>Loading...</span>
      </div>
    );
  }

  return /*(loadingBox)?(<LoadingView></LoadingView>):*/(
    <div>
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
          isError={isSignError}
          openLoginPopup={switchToLP}
          handleSignUp={handleSignUp}
          closePopup={toggleSUP}
        />
      ) : (
        <></>
      )}
      {showItemWon ? (
        <ItemWonPopup
          playGame={() => {
            window.scroll({ top: 0, behavior: "smooth" });
            setTOBP(true);
            setShowItemWon(false);
          }}
          closePopup={toggleItemsWon}
          itemWon={itemWon}
        ></ItemWonPopup>
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
      {showWithdrawalPopup ? <WithdrawPopup togglePopup={toggleWP} /> : <></>}
      {loggedIn ? (
        <></>
      ) : (
        <StickyMenuLogInOptions
          googleLogin={handleGoogleLogin}
          logIn={toggleLP}
          signUp={toggleSUP}
        />
      )}
      {showItemActWonPopup ? (
        <ItemActWon
          closePopup={() => {
            setShowIAWP(false);
          }}
          decreaseBalance={decreaseBalance}
          itemWon={prizeInInventory}
          onSell={onSell}
          onWithdraw={() => {
            onWithdrawal(prizeInInventory.id);
          }}
          wasFree={false}
          loggedIn={true}
        ></ItemActWon>
      ) : (
        <></>
      )}
      {showItemActWon ? (
        <ItemActWon
          openNew={() => {
            setTOBP(true);
            setShowItemActWon(false);
          }}
          loggedIn={loggedIn}
          onDeposit={onFreeBoxDeposit}
          decreaseBalance={decreaseBalance}
          onSignUpNow={onSignUpNow}
          wasFree={wasFree}
          onWithdraw={() => {
            onWithdrawal(itemActWon.id);
          }}
          onSell={onSell}
          closePopup={toggleIAW}
          itemWon={itemActWon}
        ></ItemActWon>
      ) : (
        <></>
      )}
      <BoxPage1
      forceUpdate={forceUpdate}
        iteration={gameIter}
        triggerOpenBoxPopup={triggerOpenBoxPopup}
        clearTrigger={clearTrigger}
        setWasFree={setWasFree}
        setItemActWon={setItemActWon}
        featuredBoxes={featuredboxes}
        uBoxInfo={boxInfo}
        decreaseBalance={decreaseBalance}
        openDepositPopup={() => {
          toggleDP()
        }}
        balance={balance}
        isLoggedIn={loggedIn}
        toggleLP={toggleLP}
        onWin={onWin}
        winningItem={winner}
        setItemInfo={SetItemInfo}
        hashSeed={hashSeed}
        gtnonce={nonce}
        onPlayGame={onPlayGame}
        getHashSeed={getHashSeed}
        box_id={box_id}
      />
      <Footer></Footer>
      {showShippingPopup ? (
        <ShippingPopup
          cashOut={() => {
            onSell(itemActWon.id);
          }}
          withdraw={() => {
            onWithdrawal(itemActWon.id);
          }}
          closePopup={() => setShowSP(false)}
        ></ShippingPopup>
      ) : (
        <></>
      )}
      {showSuccessReqPopup ? (
        <SuccessReq successMessage={successMessage} closePopup={() => setShowSRP(false)}></SuccessReq>
      ) : (
        <></>
      )}
    </div>
  );
};

export default BoxOpenPage;
