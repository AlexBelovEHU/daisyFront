/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styles from "./Main.module.css";
import LiveAnbox from "../LiveAnbox/LiveAnbox";
import Cryptoicons from "../Cryptoicons/Cryptoicons";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useTranslation } from 'react-i18next';

const AllBoxes = ({
  featuredboxes,
  showLogin,
  isLoggedIn,
  showDP,
}) => {
  const howItWorksRef = useRef(null);
  const navigate = useNavigate();
    const { t } = useTranslation();
  

  const openBoxPage = (boxinfo) => {
    navigate(`/box/${boxinfo.id}`);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftbody}>

          <h1 className={styles.fatheader}>{t("allboxes.allboxes")}</h1>
          <div id={styles.featuredluxuryboxes}>
            {featuredboxes.map((item, i) => (
              <div
                onClick={() => openBoxPage(item)}
                key={i}
                className={styles.box}
              >
                <div className={styles.mainBoxImg}>
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={window.clientConfig.imageUrl + item.image}
                  ></img>
                  <div className={styles.boxName}>{item.name}</div>
                </div>

                <div className={styles.boxinfo}>
                  <div
                    style={{
                      backgroundColor: "white",
                      width: '100%', borderRadius: "10px"}}
                  >
                    <div
                      style={{
                        backgroundColor: "#FFC658",
                        borderRadius: "50px",
                        padding: "5px",
                        fontWeight: "bold",
                        fontFamily: "Arial",
                        display: "flex",
                        justifyContent: "center",
                        height: "fit-content",
                      }}
                    >
                      {t("allboxes.openfor")}
                    </div>
                  </div>
                </div>
                {/* <img
              style={{ width: "100%", height: "100%" }}
              src={window.clientConfig.imageUrl + item.image}
            ></img> */}
              </div>
            ))}
          </div>
        </div>
        <LiveAnbox />
      </div>

      
      <div className={styles.bottom}>
        <div id={styles.howitworks}>
          <div ref={howItWorksRef} className={styles.fatheader}>{t("allboxes.howitworks")}</div>
          <div className={styles.hiwinner}>
            <div className={styles.exactlyhowitworks}>
              <div style={{ borderRadius: '50px', border: '2px solid black', height: '36px', aspectRatio: '1', fontSize: '20px', textAlign: 'center' }}>1</div>
              <div className={styles.eehiw}>

                <h2 className={styles.hiwheader}>{t("allboxes.signup")}</h2>

                <p className={styles.hiwtext}>
                  {t("allboxes.joinvia")}
                </p>
              </div>
            </div>
            <div className={styles.exactlyhowitworks}><div style={{ borderRadius: '50px', border: '2px solid black', height: '36px', aspectRatio: '1', fontSize: '20px', textAlign: 'center' }}>2</div>
              <div className={styles.eehiw}>
                <h2 className={styles.hiwheader}>{t("allboxes.topup")}</h2>
                <p className={styles.hiwtext}>
                  {t("allboxes.easilytopup")}
                </p>
              </div>
            </div>
            <div className={styles.exactlyhowitworks}><div style={{ borderRadius: '50px', border: '2px solid black', height: '36px', aspectRatio: '1', fontSize: '20px', textAlign: 'center' }}>3</div>
              <div className={styles.eehiw}>
                <h2 className={styles.hiwheader}>{t("allboxes.anboxmystery")}</h2>
                <p className={styles.hiwtext}>
                  {t("allboxes.pickabox")}
                </p>
              </div>
            </div>
            <div className={styles.exactlyhowitworks}><div style={{ borderRadius: '50px', border: '2px solid black', height: '36px', aspectRatio: '1', fontSize: '20px', textAlign: 'center' }}>4</div>
              <div className={styles.eehiw}>
                <h2 className={styles.hiwheader}>{t("allboxes.shiporswap")}</h2>
                <p className={styles.hiwtext}>
                  {t("allboxes.notwhatyouwanted")}
                </p>
              </div>
            </div>
          </div>

          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div onClick={isLoggedIn?(showDP):(showLogin)} style={{ backgroundColor: '#3E28E8', borderRadius: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '280px', height: '41px', color: 'white' }}>{t("allboxes.startanboxing")}</div>
          </div>

          <div className={styles.hiwinner}>
            <div className={styles.hiwbottom}>
              <div style={{ alignItems: 'center' }} className={styles.eehiw}>
                <h2 style={{ alignI: 'center' }} className={styles.hiwheader}>{t("allboxes.provablyfair")}</h2>
                <p style={{ textAlign: 'center' }} className={styles.hiwtext}>
                  {t("allboxes.oursystem")}
                </p>
              </div>
            </div>
            <div className={styles.hiwbottom}>
              <div style={{ alignItems: 'center' }} className={styles.eehiw}>
                <h2 style={{ textAlign: 'center' }} className={styles.hiwheader}>{t("allboxes.authenticitems")}</h2>
                <p style={{ textAlign: 'center' }} className={styles.hiwtext}>
                  {t('allboxes.everyitem')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Cryptoicons />
    </>
  );
};

export default AllBoxes;
