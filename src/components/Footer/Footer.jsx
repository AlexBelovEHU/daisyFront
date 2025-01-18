/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styles from "./Footer.module.css";
import anboxmelogo from "../../assets/Frame_4644.png";
import { useState, useEffect } from "react";
import { contactusPost } from "../../redux/actions/contactusAction";
import { useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import russianLogo from '../../assets/russianLogo.svg'
import unitedStates from '../../assets/unitedStates.svg'
import { useSearchParams } from "react-router-dom";
if (!localStorage.getItem("currentLanguage")) {//if null
  localStorage.setItem("currentLanguage", "en")
}
function Footer() {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedOption, setSelectedOption] = useState('');
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isEmailError, setIEE] = useState(false);
  const [isSending, setIsSending] = useState(false)
  const { t, i18n } = useTranslation();

  const [urlLang] = useState(searchParams.get("lang"));

  const selectLogo = {
    'en': unitedStates,
    'ru': russianLogo
  }

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    changeLanguage(event.target.value)
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const changeLanguage = (lng) => {
    localStorage.setItem("currentLanguage", lng)
    i18n.changeLanguage(lng);


    const params = new URLSearchParams();
    params.set("lang", lng);
    setSearchParams(params, {
      preventScrollReset: true,
    });

    window.location.reload()
  };
  const setupLanguage = (lng) => {
    if (lng == null) { console.log(lng + " isnt a supported language"); lng = localStorage.getItem("currentLanguage"); }
    i18n.changeLanguage(lng);
  };


  useEffect(() => {
    if (urlLang == null) {
      setupLanguage()
      setSelectedOption(localStorage.getItem("currentLanguage"))
    } else {
      setSelectedOption(urlLang)
      setupLanguage(urlLang)
      if(localStorage.getItem("currentLanguage")!=urlLang){
        localStorage.setItem("currentLanguage", urlLang)
        //window.location.reload()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlLang]);

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIEE(!isValidEmail(value))
  };

  return (
    <div className={styles.footerContainer}>
      <div className={styles.footer}>
        <div id={styles.leftfooter}>
          <img className={styles.anboxmelogo} src={anboxmelogo}></img>
          <p className={styles.hint}>
            {t("ft.openour")}
          </p>
          <div
            className={styles.faDesktop}
            style={{ display: "flex", justifyContent: "stretch" }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <a href="/faq" className={styles.fa}>
                {t("ft.faq")}
              </a>
              <a href="/about" className={styles.fa}>
                {t("ft.aboutus")}
              </a>
              <a href="/privacypolicy" className={styles.fa}>
                {t("ft.privacy")}
              </a>
              <div className={styles.languageIcon}>
                <img style={{ width: '17px' }} src={selectLogo[selectedOption]}></img>
                <select value={selectedOption} onChange={handleSelectChange} style={{ border: 'none', backgroundColor: 'transparent' }}>
                  <option value='ru' on={localStorage.getItem("currentLanguage" == 'ru')}>RU</option>
                  <option value="en" on={localStorage.getItem("currentLanguage" == 'en')}>ENG</option>
                </select>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <a href="termsandconditions" className={styles.fa}>
                {t("ft.tnc")}
              </a>
              <a href="/provablyfair" className={styles.fa}>
                {t("ft.provablyfair")}
              </a>
              <a href="cookies" className={styles.fa}>
                {t("ft.cookie")}
              </a>
            </div>
          </div>
        </div>
        <div id={styles.rightfooter}>
          <h1 className={styles.contact}>{t("ft.contactus")}</h1>
          <form style={{ width: '100%' }}>
            <div className={styles.emailInput}>
              <input
                style={{ width: "100%" }}

                placeholder={t("ft.email")}
                type="email"
                value={email}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={styles.textInput}>
              <textarea
                placeholder={t("ft.message")}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            {isEmailError ? (<p style={{ color: 'red' }}>{t("ft.invalidEmail")}</p>) : (<></>)}
          </form>
          <button
            className={styles.submitbtn}
            onClick={!isEmailError ? (() => { dispatch(contactusPost(email, message)); setIsSending(true); console.log(email + message); setEmail(''); setMessage('') }) : (() => { console.log("EmailError") })}
          >
            {t("ft.send")}
          </button>
          {isSending && <p>{t('ft.yourmessage')}</p>}
          <div className={styles.faMobileBox}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <a href="/faq" className={styles.fa}>
                {t("ft.faq")}
              </a>
              <a href="/about" className={styles.fa}>
                {t("ft.aboutus")}
              </a>
              <a href="/privacypolicy" className={styles.fa}>
                {t("ft.privacy")}
              </a>
              <div className={styles.languageIcon}>
                <img style={{ width: '17px' }} src={selectLogo[selectedOption]}></img>
                <select value={selectedOption} onChange={handleSelectChange} style={{ border: 'none', backgroundColor: 'transparent' }}>
                  <option value='ru' >RU</option>
                  <option value="en" >ENG</option>
                </select>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <a href="termsandconditions" className={styles.fa}>
                {t("ft.tnc")}
              </a>
              <a href="/provablyfair" className={styles.fa}>
                {t("ft.provablyfair")}
              </a>
              <a href="cookies" className={styles.fa}>
                {t("ft.cookie")}
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
