/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import styles from "./Main.module.css";
import Banner from "../changeableBanner/Banner";
import LiveAnbox from "../LiveAnbox/LiveAnbox";
import Cryptoicons from "../Cryptoicons/Cryptoicons";
import { useRef } from "react";
import { useTranslation } from 'react-i18next';


const openBoxPage = (boxinfo) => {
  localStorage.setItem("currentBoxInfo", JSON.stringify(boxinfo));
  console.log("boxinfoMAIN", boxinfo);
  window.location.href = `/box/${boxinfo.id}`;
};
const Main = ({
  featuredboxes,
  currentBanner,
  onshowmore,
  boxesnum,
  switchBanner,
  showLogin,
  showDP,
  isLoggedIn,
}) => {
  const { t, i18n } = useTranslation();
  const howItWorksRef = useRef(null);
  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftbody}>
          <Banner switchBanner={switchBanner} lang={i18n.language} currentBanner={currentBanner} />

          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {!isLoggedIn ? (
              <>
                <div onClick={showLogin} style={{ backgroundColor: '#03b7ff', borderRadius: '50px', display: 'flex', fontSize: '16px', justifyContent: 'center', alignItems: 'center', width: '250px', height: '45px', margin: '2vw 2vw', color: 'white' }}>{t("main.startanboxing")}</div>
                <div onClick={() => howItWorksRef.current.scrollIntoView()} style={{ backgroundColor: 'transparent', fontSize: '16px', borderRadius: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '250px', height: '45px', margin: '2vw 2vw', color: '#03b7ff', border: '1px solid #03b7ff' }}>{t('main.howitworks')}</div>
              </>) : (<>
    
              </>)}

          </div>

          <div id={styles.featuredluxuryboxes}>
            {featuredboxes.slice(0, boxesnum).map((item, i) => (
              <div onClick={() => openBoxPage(item)} key={i} className={styles.box}>
                <div className={styles.mainBoxImg}>
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={window.clientConfig.imageUrl + item.image}
                  ></img>
                  <div className={styles.boxName}>{item.name}</div>
                </div>

                <div className={styles.boxinfo}>
                  <div style={{
                    backgroundColor: "white",
                    width: '100%', borderRadius: "10px"
                  }}>
                    <div
                      style={{
                        backgroundColor: "#73ffdc",
                        borderRadius: "50px",
                        padding: "5px",
                        fontWeight: "bold",
                        fontFamily: "Arial",
                        display: "flex",
                        justifyContent: "center",
                        height: "fit-content",
                      }}
                    >
                      {t('main.openfor')}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={onshowmore} id={styles.showmorebutton}>
              {t("main.showmore")}
            </button>
          </div>

        </div>
        <LiveAnbox />

      </div>
      <div className={styles.bottom}>
        <div id={styles.howitworks}>
          <div ref={howItWorksRef} className={styles.fatheader}>{t("main.howitworks")}</div>
          <div className={styles.hiwinner}>
            <div className={styles.exactlyhowitworks}>
              <div style={{ borderRadius: '50px', border: '2px solid black', height: '36px', aspectRatio: '1', fontSize: '20px', textAlign: 'center' }}>1</div>
              <div className={styles.eehiw}>

                <h2 className={styles.hiwheader}>{t("main.signup")}</h2>

                <p className={styles.hiwtext}>
                  {t("main.joinvia")}
                </p>
              </div>
            </div>
            <div className={styles.exactlyhowitworks}><div style={{ borderRadius: '50px', border: '2px solid black', height: '36px', aspectRatio: '1', fontSize: '20px', textAlign: 'center' }}>2</div>
              <div className={styles.eehiw}>
                <h2 className={styles.hiwheader}>{t("main.topup")}</h2>
                <p className={styles.hiwtext}>
                  {t("main.easilytopup")}
                </p>
              </div>
            </div>
            <div className={styles.exactlyhowitworks}><div style={{ borderRadius: '50px', border: '2px solid black', height: '36px', aspectRatio: '1', fontSize: '20px', textAlign: 'center' }}>3</div>
              <div className={styles.eehiw}>
                <h2 className={styles.hiwheader}>{t("main.anboxmystery")}</h2>
                <p className={styles.hiwtext}>
                  {t("main.pickabox")}
                </p>
              </div>
            </div>
            <div className={styles.exactlyhowitworks}><div style={{ borderRadius: '50px', border: '2px solid black', height: '36px', aspectRatio: '1', fontSize: '20px', textAlign: 'center' }}>4</div>
              <div className={styles.eehiw}>
                <h2 className={styles.hiwheader}>{t("main.shiporswap")}</h2>
                <p className={styles.hiwtext}>
                  {t('main.notwhatyouwanted')}
                </p>
              </div>
            </div>
          </div>
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div onClick={isLoggedIn?(showDP):(showLogin)} style={{ backgroundColor: '#03b7ff', borderRadius: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '280px', height: '41px', color: 'white' }}>{t('main.startanboxing')}</div>
          </div>
          
        </div>
      </div>
    </>
  )
};

export default Main;
