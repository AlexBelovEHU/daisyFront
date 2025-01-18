/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import styles from "./Account.module.css";
import LiveAnbox from "../LiveAnbox/LiveAnbox";
import { useState } from "react";
import { useTranslation } from 'react-i18next';



const Account = ({
  openHistory,
  openWithdraw,
  logout,
  defaultUser,
  userEdit,
  updater,
}) => {
  const { t } = useTranslation();
  const [password, setPassword] = useState(defaultUser.password);
  const [isEdit, setEdit] = useState(false);


  const [isEditShipping, setIES] = useState(false);
  const [formValues, setFormValues] = useState(defaultUser
  );



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const lastChar = value[value.length - 1];

    // Check if the last character is a letter, number, or whitespace
    const allowedCharacters = /^[a-zA-Z0-9\s+@]$/;
    if (allowedCharacters.test(lastChar) || value === '') {
      setFormValues({
        ...formValues,
        [name]: value
      });
    } else {
      event.preventDefault(); // Cancel the change if it's not allowed
    }
  };


  const toggleEdit = () => {
    setEdit(!isEdit);
    if (isEdit) {
      userEdit(formValues.email, password, formValues);
    }
  };
  const toggleEditShipping = () => {
    setIES(!isEditShipping);
    if (isEditShipping) {
      userEdit(formValues.email, password, formValues);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.leftbody}>
        <div className={styles.accounttop}>
          <a id={styles.back} href="/">
            {t('acc.back')}
          </a>
          <div id={styles.chooseMenu}>
            <button id={styles.accountbtn}>{t("acc.account")}</button>
            <button onClick={openHistory} id={styles.historybtn}>
              {t("acc.history")}
            </button>
            <button onClick={openWithdraw} id={styles.cashoutbtn}>
              {t("acc.cashout")}
            </button>
          </div>
        </div>
        <h1 className={styles.fatheader}>{t("acc.welcometo")}</h1>
        <form id={styles.personaldata}>
          <input
            className={styles.inputAccount}
            disabled={!isEdit}
            type="text"
            value={formValues.email}
            onChange={handleInputChange}
            name="email"
            placeholder={t("acc.phemail")}
          />

          <input
            className={styles.inputAccount}
            disabled={!isEdit}
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("acc.phpassword")}
          />
        </form>

        <button onClick={toggleEdit} id={styles.editpersonalbtn}>
          {isEdit ? t("acc.save") : t("acc.edit")} {t('acc.personaldata')}
        </button>
        <h1 className={styles.fatheader}>{t("acc.shippingaddress")}</h1>
        <p id={styles.shippingprompt}>
          {t("acc.shippingprompt")}
        </p>
        <form id={styles.personaldata}>
          <input
            className={styles.inputAccount}
            type="text"
            disabled={!isEditShipping}
            value={formValues.name}
            onChange={handleInputChange}
            name="name"
            placeholder={t("acc.firstname")}
          />
          <input
            className={styles.inputAccount}
            type="text"
            disabled={!isEditShipping}
            value={formValues.lastName}
            onChange={handleInputChange}
            name='lastName'
            placeholder={t("acc.lastname")}
          />
          <input
            className={styles.inputAccount}
            type="text"
            disabled={!isEditShipping}
            value={formValues.address}
            name="address"
            onChange={handleInputChange}
            placeholder={t("acc.address")}
          />
          <input
            className={styles.inputAccount}
            type="text"
            disabled={!isEditShipping}
            value={formValues.country}
            onChange={handleInputChange}
            name="country"
            placeholder={t("acc.country")}
          />
          <input
            className={styles.inputAccount}
            type="text"
            disabled={!isEditShipping}
            name="state"
            value={formValues.state}
            onChange={handleInputChange}
            placeholder={t("acc.state")}
          />
          <input
            className={styles.inputAccount}
            type="text"
            disabled={!isEditShipping}
            name="city"
            value={formValues.city}
            onChange={handleInputChange}
            placeholder={t("acc.city")}
          />
          <input
            className={styles.inputAccount}
            type="text"
            disabled={!isEditShipping}
            value={formValues.code}
            name="code"
            onChange={handleInputChange}
            placeholder={t("acc.code")}
          />
          <input
            className={styles.inputAccount}
            type="text"
            disabled={!isEditShipping}
            value={formValues.address_2}
            name="address_2"
            onChange={handleInputChange}
            placeholder={t("acc.address2")}
          />
          <input
            className={styles.inputAccount}
            name="phoneNumber"
            type="text"
            disabled={!isEditShipping}
            value={formValues.phoneNumber}
            onChange={handleInputChange}
            placeholder={t("acc.phone")}
          />
        </form>
        <button onClick={toggleEditShipping} id={styles.editshipaddress}>
          {isEditShipping ? t("acc.save") : t("acc.edit")} {t("acc.tshippingaddress")}
        </button>
        <a onClick={logout} style={{ color: "black", fontWeight: "bold" }}>
          {t("acc.logout")}
        </a>
      </div>
      <LiveAnbox />
    </div>
  );
};

export default Account;
