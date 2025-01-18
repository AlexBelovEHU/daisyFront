/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import styles from './NoFreeBoxesPopup.module.css'
import { useTranslation } from 'react-i18next';

import checkCircle from '../../assets/check_circle.svg'
const NoFreeBoxesPopup = ({ closePopup, toggleDP }) => {
  const { t } = useTranslation();
  const timeoutID = setTimeout(()=>{closePopup()},500000)
  return (
    <div className={styles.popup}>
      <div className={styles.popupinner}>
        <div className={styles.popupTop}>
          <div>
            <img src={checkCircle}></img>
          </div>
          <div style={{textAlign:'start'}}>
            <button onClick={()=>{closePopup();clearTimeout(timeoutID)}} className={styles.closebutton}> ⓧ </button>
            <p className={styles.messageName}>{t("nfbp.getyourbonustoday")}</p>
            <p className={styles.message}>{t("nfbp.makeadeposit")}</p>
            <div style={{padding:'5px 15px',display:'flex',justifyContent:'center',alignItems:'center', backgroundColor: '#3E28E8',marginTop:'10px',marginLeft:'10px', borderRadius: '50px',fontSize:'13px', textAlign: 'center',width:'fit-content', color: 'white' }} 
            onClick={()=>{toggleDP();clearTimeout(timeoutID)}}>{t("nfbp.addcredits")}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoFreeBoxesPopup;
