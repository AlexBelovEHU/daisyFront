/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
// src/CaseScroll.js
import React, { useState, useEffect, useRef } from "react";
import "./BoxPage.css";
import "../../components/LiveAnbox/LiveAnbox";
import LiveAnbox from "../../components/LiveAnbox/LiveAnbox";
import cord from "../../assets/cord.png";
import purpleArrows from "../../assets/centerMarker.svg";

import { useDispatch } from "react-redux";

import OpenBoxPopup from "../OpenBoxPopup/OpenBoxPopup";
import { allboxes } from "../../redux/actions/allboxesAction";
import { useTranslation } from 'react-i18next';

const useOnScreen = (ref) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isIntersecting;
};

function shuffle(itemsin, num, winner, winnerpos) {
  var itemsout = [];
  for (let i = 0; i < num; i++) {
    if (winner !== "no winner" && i === winnerpos) {
      itemsout = itemsout.concat(winner);
    } else {
      itemsout = itemsout.concat(
        itemsin[Math.floor(Math.random() * itemsin.length)]
      );
    }
  }
  return itemsout;
}


var itemsget = [];
var boxInfo = [];
try {
  boxInfo = JSON.parse(localStorage.getItem("currentBoxInfo"));
  try {
    boxInfo.prizes.forEach((prize, i) => {
      const rarities = ["red", "yellow", "grey", "pink"];
      const rarity = rarities[i % rarities.length];
      itemsget.push({
        name: prize.name,
        rarity: rarity,
        image: prize.image,
        price: prize.price,
        id: prize.prize_id,
        probability: prize.odd,
        description: prize.description,
      });
    });
  } catch {
    console.log("No items rn fr fr");
  }
} catch {
  console.log("no boxes rn fr fr");
}


const openBoxPage = (boxinfo) => {
  // localStorage.setItem("currentBoxInfo", JSON.stringify(boxinfo));
  console.log("BOxPAge1BOX", boxinfo);
  window.location.href = `/box/${boxinfo.id}`;
};

const length = 100;
const marginwinner = 4;
const minwinner = 20;
var distance = 50;
var scrollthrough = 1; //how many time the roulette fully scrolls without stopping;

const itemsonscreen = 5; //set to be odd

var winnerPos = Math.floor(
  Math.random() * (length - 1 - marginwinner - minwinner) + minwinner
);
const testwinner = { name: "Cord", rarity: "pink", image: cord };

// var items = shuffle(itemsget, length, "no winner", winnerPos);
var items = shuffle(
  itemsget.length ? itemsget : [testwinner],
  length,
  "no winner",
  winnerPos
);
var speed = 50;
const subdivisions = 5;
var justalittlemoreplease = Math.floor(Math.random() * (subdivisions - 1));

const CaseScroll = ({
  getHashSeed,
  onPlayGame,
  hashSeed,
  gtnonce,
  setItemInfo,
  winningItem,
  onWin,
  isLoggedIn,
  toggleLP,
  balance,
  openDepositPopup,
  decreaseBalance,
  featuredBoxes,
  setItemActWon,
  setWasFree,
  triggerOpenBoxPopup,
  clearTrigger,
  iteration,
  box_id,
  uBoxInfo
}) => {
  const ref = useRef();
  const isVisible = useOnScreen(ref);

  const [position, setPosition] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [nonce] = useState(gtnonce);
  const [wantingASeed, setWantingASeed] = useState(true);
  const [showOpenBoxPopup, setShowOBP] = useState(false);
  const [actualFeaturedBoxes, setAFB] = useState([]);
  const [isDescriptionExpanded, setIDEX] = useState(false);
    const { t } = useTranslation();
  const [currentBoxPrice] = React.useState(
    JSON.parse(localStorage.getItem("currentBoxInfo"))?.price || 0
  );
  const [isPlayerBroke, setIsPlayerBroke] = useState(false);
  const toggleIDEX = () => {
    setIDEX(!isDescriptionExpanded);
  };
  useEffect(()=>{boxInfo=uBoxInfo},[uBoxInfo])
  // const { box_id } = useParams();
  const dispatch = useDispatch();

  const fetchBoxFromParams = (page) => {
    // setLoading(true);
    dispatch(allboxes(page))
      .then((res) => {
        const boxList = res.data;
        console.log("Box list", boxList);
        const boxFound = boxList.find((box) => box.id === parseInt(box_id, 10));
        if (boxFound) {
          // setForceUpdate(!forceUpdate);
          localStorage.setItem("currentBoxInfo", JSON.stringify(boxFound));
          // setLoading(false);
        } else {
          // setLoading(false);
          console.log("Box not found on this page");
        }
      })
      .catch((error) => {
        console.error("Error occurred while fetching boxes:", error);
      });
  };

  useEffect(() => {
    if (box_id) {
      const pageToFetch = Math.floor(box_id / 50);
      console.log(`Fetching page ${pageToFetch} for box_id ${box_id}`);
      fetchBoxFromParams(pageToFetch);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [box_id]);

  useEffect(() => {
    itemsget=[];
    try {
      boxInfo = JSON.parse(localStorage.getItem("currentBoxInfo"));
      try {
        boxInfo.prizes.forEach((prize, i) => {
          const rarities = ["red", "yellow", "grey", "pink"];
          const rarity = rarities[i % rarities.length];
          itemsget.push({
            name: prize.name,
            rarity: rarity,
            image: prize.image,
            price: prize.price,
            id: prize.prize_id,
            probability: prize.odd,
            description: prize.description,
          });
        });
      } catch {
        console.log("No items rn fr fr");
      }
    } catch {
      console.log("no boxes rn fr fr");
    }
    console.log("Box info", boxInfo);
    console.log("Itemsget", itemsget);
    console.log("Items", items);
    items = shuffle(itemsget, length, "no winner", winnerPos);
  }, []);

  useEffect(() => {
    console.log("finding recommended boxes...");
    let tempBoxes = [];
    for (let i = 0; i < featuredBoxes.length; i++) {
      const box = featuredBoxes[i];
      if (window.clientConfig.recommendedBoxesId.includes(box.id)) {
        tempBoxes.push(box);
      }
    }
    setAFB(tempBoxes);
  }, [featuredBoxes]);

  useEffect(() => {
    if (triggerOpenBoxPopup === true) {
      startScrolling(false)
      setShowOBP(false);
      clearTrigger();
    }
  }, [triggerOpenBoxPopup]);

  const intervalRef = useRef(null);
  if (wantingASeed) {
    console.log("getting a new seed");
    getHashSeed();
    setWantingASeed(false);
  }
  React.useEffect(() => {
    console.log("component updated", hashSeed, gtnonce);
  }, [hashSeed, nonce, winningItem]);
  React.useEffect(() => {
    if (winningItem == "Error") {
      setIsScrolling(false);
      console.log("stopping");
      scrollthrough = 0;
    } else if (winningItem != null) {
      winnerPos = Math.floor(
        Math.random() * (length - 1 - marginwinner - minwinner) + minwinner
      );
      items[winnerPos] = JSON.parse(winningItem);
      scrollthrough = Math.min(scrollthrough, 2);
      console.log(scrollthrough);
    }
  }, [winningItem, iteration]);

  const startScrolling = (isFree) => {
    window.scroll({ top: 0, behavior: "instant" });
    if (currentBoxPrice >= balance && !isFree) {
      setIsPlayerBroke(true);
      openDepositPopup();
    } else {
      if (!isFree) {
        decreaseBalance(boxInfo.price);
      }
      console.log(currentBoxPrice, balance);
      setShowOBP(false);
      console.log("Started scrolling");
      if (isFree) {
        setWasFree(true);
        const randomWinNumber = Math.floor(Math.random() * 3);//choosing randomly between 3 best items -_- no one gon notice lmao
        itemsget.sort((a,b)=>{
          if(a.price<b.price){
            return 1
          }
          else{return -1}
        })
        winningItem = itemsget[randomWinNumber]
        winnerPos = Math.floor(
          Math.random() * (length - 1 - marginwinner - minwinner) + minwinner
        );
        items[winnerPos] = winningItem;
        scrollthrough = Math.min(2);
        console.log(scrollthrough, randomWinNumber, winningItem);
        setIsScrolling(true);
        console.log("starting");
        setItemActWon(winningItem);
      } else {
        setWasFree(false);
        const newClientSeed = new Uint8Array(8);
        crypto.getRandomValues(newClientSeed);
        const seed = Array.from(newClientSeed)
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");

        console.log(seed);
        setIsScrolling(true);
        console.log("starting");
        onPlayGame(hashSeed, gtnonce, seed, boxInfo.id, isFree);

        scrollthrough = 1000;
        distance = winnerPos * subdivisions - position;
        justalittlemoreplease = Math.floor(Math.random() * (subdivisions - 1));
      }
    }
  };
  if (
    Math.floor(
      (position - justalittlemoreplease + (itemsonscreen / 2) * subdivisions) /
        subdivisions
    ) == winnerPos &&
    scrollthrough <= 0
  ) {
    if (isScrolling) {
      setIsScrolling(false);
      console.log("stopping");
      onWin();
      setWantingASeed(true);
    }
  }
  useEffect(() => {
    if (isScrolling) {
      speed = 50;

      const scroll = () => {
        setPosition((prevPosition) => {
          var dX=scrollthrough==0?(1):(11)
          var nextPosition = prevPosition + dX;
          if (nextPosition > items.length * subdivisions) {
            nextPosition = nextPosition % (items.length * subdivisions);
            scrollthrough -= 1;
          }
          distance = winnerPos * subdivisions - prevPosition;
          if (scrollthrough != 0) {
            speed = 1;
          } else {
            speed = (400 * length) / distance/distance; // Increase speed (slowing down)
          }
          return nextPosition;
        });
        intervalRef.current = setTimeout(scroll, speed);
      };

      intervalRef.current = setTimeout(scroll, speed);
    } else {
      clearTimeout(intervalRef.current);
    }

    return () => clearTimeout(intervalRef.current);
  }, [isScrolling]);

  if (!items || !boxInfo) {
    return <div>...Loading</div>;
  }

  return (
    <div id="containerroulette">
      {isVisible ? (
        <></>
      ) : (
        <div id="boxPageStickyStartButton">
          <img
            id="boxOpenPageStickyImage"
            style={{ width: "70px" }}
            src={window.clientConfig.imageUrl + boxInfo.image}
          ></img>
          <div id="boxOpenPageSpecialContainer1">
            <p style={{ color: "white" }}>{boxInfo.name}</p>
            <button
              ref={ref}
              className="boxPageStickyOpen"
              onClick={
                isLoggedIn
                  ? () => {
                      setIsPlayerBroke(false);
                      setShowOBP(false);
                      startScrolling(false)
                    }
                  : toggleLP
              }
              disabled={isScrolling}
            >
              {t("bp.openfor")} {boxInfo.price > 0 ? "$ " + boxInfo.price : t("bp.free")}
            </button>
          </div>
        </div>
      )}
      <div className="case-scroll">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <a
            href="/"
            style={{
              textDecoration: "none",
              textAlign: "start",
              color: "black",
              fontWeight: "600",
              marginBottom: "20px",
            }}
          >
            {t("bp.back")}
          </a>
          <p id="BoxopenpagePrompt">
            {t("bp.roulettebelow")}
          </p>
        </div>
        <div
          style={{ position: "relative", display: "grid", marginTop: "20px" }}
        >
          <div id="purple-arrows">
            <img style={{ height: "100%" }} src={purpleArrows}></img>
          </div>
          <div className="gray-bg">
            <div className="white-bg">
              <div
                className="case-scroll-container"
                style={{
                  transform: `translateX(-${
                    (position * 100) / subdivisions / items.length
                  }%)`,
                  transition: `transform ${speed}ms ${
                    distance <= 4 ? "linear" : "linear"
                  }`,
                }}
              >
                {items.map((item, index) => (
                  <div
                    key={index}
                    className={`item ${item.rarity} ${
                      index ===
                      Math.floor(
                        (position + (itemsonscreen / 2) * subdivisions) /
                          subdivisions
                      )
                        ? "highlight"
                        : ""
                    }`}
                  >
                    <img
                      className="itemImg"
                      src={window.clientConfig.imageUrl + item.image}
                    ></img>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: "white" }}>
          <div ref={ref} className="cratenameopen">
            <img
              className="boxicon"
              src={window.clientConfig.imageUrl + boxInfo.image}
            ></img>
            <div>
              <p className="boxpagename">{boxInfo.name}</p>
              <p
                className={
                  isDescriptionExpanded
                    ? "expanded boxpagedescription fontfix"
                    : "boxpagedescription fontfix"
                }
              >
                {boxInfo.description}{" "}
              </p>
              <p style={{ margin: "0 0 3vh 0", fontSize:'14px' }} onClick={toggleIDEX}>
                {isDescriptionExpanded ? "Hide" : "Show more"}
              </p>

              <button
                className="openforbutton mobilehide"
                onClick={
                  isLoggedIn
                    ? () => {
                        setIsPlayerBroke(false);
                        setShowOBP(false);
                        startScrolling(false)
                      }
                    : toggleLP
                }
                disabled={isScrolling}
              >
                {t('bp.openfor')} {boxInfo.price > 0 ? "$ " + boxInfo.price : t("bp.free")}
              </button>
              <button
                onClick={() => {
                  startScrolling(true);
                }}
                disabled={isScrolling}
                className="tryforfreebtn mobilehide"
              >
                {t("bp.tryforfree")}
              </button>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: "10px",
            }}
          >
            <button
              className="openforbutton mobileshow"
              onClick={
                isLoggedIn
                  ? () => {
                      setIsPlayerBroke(false);
                      setShowOBP(false);
                      startScrolling(false)
                    }
                  : toggleLP
              }
              disabled={isScrolling}
            >
              {t('bp.openfor')} {boxInfo.price > 0 ? "$ " + boxInfo.price : t("bp.free")}
            </button>
            <button
              onClick={() => {
                startScrolling(true);
              }}
              disabled={isScrolling}
              className="tryforfreebtn mobileshow"
            >
              {t("bp.tryforfree")}
            </button>
          </div>
        </div>

        <p className="products-inside">{t("bp.productsinside")}</p>

        <div
          style={{
            display: "grid",
            overflow: "scroll",
          }}
        >
          <div className="BoxPageItemsInside">
            {itemsget.map((item, i) => (
              <div  key={i} className="box">
                <div className="mainBoxImg">
                  <img onClick={() => {
                setItemInfo(item);
              }}
                    style={{
                      width: "100%",
                      objectFit: "contain",
                      aspectRatio: "1",
                      padding: " 10px",
                    }}
                    src={window.clientConfig.imageUrl + item.image}
                  ></img>
                  <div className="boxName">{item.name}</div>
                </div>

                <div className="boxinfo">
                  <div
                    style={{ backgroundColor: "white", borderRadius: "10px", width:'100%' }}
                  >
                    <div
                      style={{
                        backgroundColor: "transparent",
                        color:'black',
                        fontWeight:'300',
                        fontStyle:'italic',
                        display: "flex",
                        justifyContent: "start",
                        height: "fit-content",
                        fontSize:"12px"
                      }}
                    >
                      {t("bp.retail")+": $"}
                      {item.price}
                    </div>
                    <div className="BoxPageItemPriceText" onClick={()=>{window.scrollTo(0,0)}} style={{
                        backgroundColor: "#FFC658",
                        color:'black',
                        display: "flex",
                        justifyContent: "center",
                        height: "fit-content",
                        marginTop:'10px',
                        padding:'6px 10px',
                        width:'100%',
                        borderRadius:'50px'
                        }}>
                      {t("bp.getfor")} ${boxInfo.price}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="products-inside">{t("bp.recommended")}</p>

        <div id="BoxPageFeaturedLuxuryBoxes">
          {actualFeaturedBoxes.map((item, i) => (
            <div key={i} className="box" onClick={() => openBoxPage(item)}>
              <div className="mainBoxImg">
                <img
                  style={{ width: "100%" }}
                  src={window.clientConfig.imageUrl + item.image}
                ></img>
                <div className="boxName">{item.name}</div>
              </div>

              <div className="boxinfo">
                <div style={{ backgroundColor: "white", borderRadius: "10px",width:'100%' }}>
                  <div
                    style={{
                      backgroundColor: "#FFC658",
                      borderRadius: "50px",
                      padding: "10px 10px",
                      width:'100%',
                      fontWeight: "bold",
                      fontFamily: "Arial",
                      display: "flex",
                      justifyContent: "center",
                      height: "fit-content",
                    }}
                  >
                    {t("bp.openfor")+ " $"}
                    {item.price}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <LiveAnbox />
      {showOpenBoxPopup ? (
        <OpenBoxPopup
          isPlayerBroke={isPlayerBroke}
          onOpen={() => startScrolling(false)}
          closePopup={() => {
            setShowOBP(false);
          }}
        ></OpenBoxPopup>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CaseScroll;
