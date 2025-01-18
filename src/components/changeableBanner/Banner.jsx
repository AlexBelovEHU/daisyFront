import React from "react";
import styles from "./Banner.module.css";
import newBanner from "../../assets/newBanner.svg";
import bannerRus from '../../assets/bannerRus.png'

const banners = {'en':newBanner,'ru':bannerRus};
const headers = [
  "",
  "",
  "",
];
const paragraphs = [
  "",
  "",
  "",
];
const alts =["Open online gaming lootbox as hype drop but better. Outlet discount online luxury shopping"]

const Banner = ({ currentBanner, lang }) => {
  if(typeof lang!='string'){
    lang='en'

  }
  return(
  <div style={{ display: "grid", overflow: "hidden",position:'relative' }}>
    <div
      style={{
        position: "relative",
        transform: `translateX(-${(((currentBanner - 1) % banners.length) * 100) / banners.length}%)`,
        transition: `transform 1000ms ease`,
        display: "flex",
      }}
    >
      
        <div
        className={styles.bannercontainer} style={{ position: "relative",padding:"0px 10px" }}>
          <div
            className={styles.bannerText}
            style={{
              position: "absolute",
              top: "5vw",
              left: "5vw",
              maxWidth: "70%",
            }}
          >
            <h1 className={styles.header}>{headers[0]}</h1>
            <p className={styles.paragraph}>{paragraphs[0]}</p>
          </div>
          <img alt={alts[0]} src={banners[lang]} className={styles.banner} />
        </div>
      
    </div>
    
  </div>
)
};

export default Banner;
