/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable default-case */
import React, { useState } from 'react';
import styles from './SuccessReq.module.css'
import checkCircle from '../../assets/check_circle.svg'
import { useTranslation } from 'react-i18next';


function SuccessReq({ closePopup, successMessage }) {
  const { t } = useTranslation();
  setTimeout(()=>{closePopup()},15000)

  const [messageName,setMessageName]=useState();
  const [message,setMessage]=useState();

  React.useEffect(()=>{
    switch(successMessage){
      case 'withdrawMoney':
        setMessageName(t('sr.withdrawalinprogress'));
        setMessage(t('sr.requestrecieved'));
        return;
      case 'withdraw':
        setMessageName(t("sr.ordercreated"));
        setMessage(t('sr.orderinprogress'));
        return;
      case 'sell':
        setMessageName(t("sr.itemsold"));
        setMessage(t("sr.balanceupdated"));
        return;
    }
  },[successMessage])


  return (
    <div className={styles.popup}>
      <div className={styles.popupinner}>
        <div className={styles.popupTop}>
          <div>
            <img src={checkCircle}></img>
          </div>
          <div style={{textAlign:'start'}}>
            <button onClick={closePopup} className={styles.closebutton}> ⓧ </button>
            <p className={styles.messageName}>{messageName}</p>
            <p className={styles.message}>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessReq;