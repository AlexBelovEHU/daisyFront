/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styles from "./ItemWonPopup.module.css";
import cross from "../../assets/close_button-removebg-preview.png";
import { useTranslation } from 'react-i18next';

var boxInfo = [];
try {
  boxInfo = JSON.parse(localStorage.getItem("currentBoxInfo"));
}catch{ /* empty */ }
function ItemActWon({ closePopup, itemWon, onSell, onWithdraw, wasFree, onSignUpNow, decreaseBalance, loggedIn, openNew }) {
    const { t } = useTranslation();
  const pattern = /^\$\d+\.\d+ Voucher$/;

  const isVoucher = pattern.test(itemWon.name)

  return (
    <div className={styles.popup}>
      <div className={styles.popupinner}>
        <div className={styles.popupTop}>
          <p style={{ fontWeight: "700", fontSize: "3vh", color: "black" }}>
            {t('iaw.congratulations')}!
          </p>
          <button onClick={closePopup} className={styles.closebutton}>
            <img
              style={{ height: "20px", width: "20px" }}
              alt="x"
              src={cross}
            ></img>
          </button>

          <div id={styles.wonImg}><img style={{ width: '100%', objectFit: 'contain', maxHeight: '300px' }} src={window.clientConfig.imageUrl + itemWon.image}></img></div>

          <h1>{itemWon.name} {wasFree?(t("iaw.might")):(t('iaw.is'))}{'!'}</h1>
        </div>
        <div className={styles.popupBottom}>
          {!wasFree ? (
            <>
            <button
              className={styles.submitbutton}
              onClick={() => {
                console.log(itemWon);
                onSell(itemWon.id);
                decreaseBalance(-1*itemWon.price)
              }}
            >
              {t("iaw.cashoutfor")} $ {itemWon.price}
            </button>
          {isVoucher ? (<></>) : (<button className={styles.gettheproduct} onClick={() => { console.log("tryingToWithdraw"); onWithdraw(itemWon.id) }}>{t("iaw.getdelivered")}</button>)}
            </>) : (loggedIn ? (<button className={styles.submitbutton} onClick={() => { openNew() }}>{t("iaw.openfor")} $ {boxInfo.price}</button>):(<button className={styles.submitbutton} onClick={() => { onSignUpNow() }}>{t("iaw.sigup")}</button>))
          }
        </div>
      </div>
    </div>
  );
}

export default ItemActWon;
