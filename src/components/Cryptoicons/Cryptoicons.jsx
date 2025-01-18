/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styles from "./Cryptoicons.module.css";
import visa from "../../assets/v.webp"
import mstrcrd from "../../assets/mc.webp"
import ap from "../../assets/ap.webp"
import gp from "../../assets/gp.webp"
import ideal from "../../assets/ideal.webp"
import link from "../../assets/link.webp"
import bncntct from "../../assets/bancon.webp"
import mb from "../../assets/mb.webp"

const Cryptoicons = () => (
    <div className={styles.cryptoicons}>
        <img className={styles.icon} src={visa}></img>
        <img className={styles.icon} src={mstrcrd}></img>
        <img className={styles.icon} src={ap}></img>
        <img className={styles.icon} src={gp}></img>
        <img className={styles.icon} src={bncntct}></img>
        <img className={styles.icon} src={ideal}></img>
        <img className={styles.icon} src={link}></img>
        <img className={styles.icon} src={mb}></img>
    </div>
);

export default Cryptoicons;
