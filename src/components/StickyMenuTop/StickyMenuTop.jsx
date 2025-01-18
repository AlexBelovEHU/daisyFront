/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-expressions */
import React, { useEffect } from "react";
import styles from "./StickyMenuTop.module.css";
import Anboxmelogo from "../../assets/Frame_4644.png";
import Boxlogo from "../../assets/logo.svg";
import headimg from "../../assets/account_circle.svg";
import gift2 from "../../assets/freebox_icon.svg";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const StickyMenuTop = ({
  isloggedIn,
  toggleDP,
  toggleSP,
  balance,
  bonusBoxes,
  toggleLP,
  openBonusBox,
}) => {
  const [redIndicator] = useState(false);
  const [convertedBalance, setConvertedBalance] = useState(balance);
  const { t } = useTranslation();

  useEffect(() => {
    try {
      setConvertedBalance(balance.toFixed(2));
    } catch (e) { /* empty */ }
  }, [balance]);

  const location = useLocation();

  const checkBonusBoxes = () => {
    const currentBoxId = location.pathname.split("/box/")[1];
    const targetBoxId = bonusBoxes[0];
    if (currentBoxId && parseInt(currentBoxId, 10) === targetBoxId) {
      console.log("Already on the target box page.");
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className={styles.stickymenu}>
      <div className={styles.stickymenutop}>
        <div className={styles.leftside}>
          <a
            style={{
              padding: 0,
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
            href="/"
          >
            <img
              className={styles.anboxlogo}
              style={{
                height: '24px',
                width: '250px',
                objectFit: "contain",
                maxHeight: "30px",
              }}
              src={Anboxmelogo}
            />
            <img className={styles.boxlogo} style={{ objectFit: 'contain', height: '20px' }} src={Boxlogo} />
          </a>
        </div>

        {isloggedIn ? (

          <div className={styles.rightside}>
            <div
              id={styles.depositedamountview}
              className={styles.stickymenuitem}
            >
              <div>
                <p style={{ padding: 0, whiteSpace: 'nowrap', margin: 0, color: 'black' }}>{convertedBalance + ' $'}</p>
              </div>
              <div>
                <button
                  onClick={toggleDP}
                  style={{
                    padding: "0px",
                    margin: 0,
                    border: "none",
                    backgroundColor: "transparent",
                  }}
                >
                  <div id={styles.plus}>+</div>
                </button>
              </div>
            </div>

            <img
              onClick={() => {
                checkBonusBoxes() ? null : openBonusBox();
              }}
              alt="bonus"
              style={{ backgroundColor: redIndicator ? "red" : "transparent" }}
              className={styles.stickymenuitem + " " + styles.containedImg}
              id={styles.bonus}
              src={gift2}
            />
            <img
              onClick={
                isloggedIn
                  ? () => {
                    window.location.href = "/account";
                  }
                  : toggleLP
              }
              className={styles.stickymenuitem + " " + styles.containedImg}
              id={styles.headimage}
              src={headimg}
            />
          </div>
        ) : (
          <div className={styles.rightside}>
            <button
              onClick={toggleLP}
              style={{ whiteSpace: 'nowrap' }}
              className={styles.stickymenuitem}
              id={styles.login}
            >
              {t("smt.login")}
            </button>
            <button
              onClick={toggleSP}
              style={{ whiteSpace: 'nowrap' }}
              className={styles.stickymenuitem}
              id={styles.signup}
            >
              {t("smt.signup")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StickyMenuTop;
