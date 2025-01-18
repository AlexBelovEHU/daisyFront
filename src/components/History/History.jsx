import React from "react";
import styles from "./History.module.css";
import LiveAnbox from "../LiveAnbox/LiveAnbox";
import { useTranslation } from 'react-i18next';

const defaultName = (nameIn) => {
  switch (nameIn) {
    case "id":
      return "Id";
    case "ts":
      return "Timestamp";
    case "type_transaction":
      return "Transaction type";
    case "amount":
      return "Amount";
    case "nonce":
      return "Nonce";
    case "box_name":
      return "Box name";
    case "server_seed":
      return "Server seed";
    case "client_seed":
      return "Client seed";
    case "game_result":
      return "Game result";
    case "prize_name":
      return "Prize name";
    case "balance":
      return "Balance";

    default:
      return nameIn;
  }
};

const History = ({ openAccount, openWithdraw, historyData }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.leftbody}>
        <div className={styles.accounttop}>
          <a id={styles.back} href="/">
          {t('acc.back')}
          </a>
          <div id={styles.chooseMenu}>
            <button onClick={openAccount} id={styles.accountbtn}>
            {t("acc.account")}
            </button>
            <button id={styles.historybtn}>{t("acc.history")}</button>
            <button onClick={openWithdraw} id={styles.cashoutbtn}>
            {t("acc.cashout")}
            </button>
          </div>
        </div>
        <h1 className={styles.fatheader}>{t("acc.welcometo")}</h1>
        <div style={{ overflow: "scroll", maxHeight: "70vh",maxWidth:'88vw'}}>
          <table className={styles.mainTable}>
            <thead>
              <tr className={styles.tableHeader}>
                {() => {
                  try {
                    return Object.keys(historyData[0]).map((key, i) => {
                      return (
                        <th key={i} className={styles.tablecolumn}>
                          {defaultName(key)}
                        </th>
                      );
                    })
                  }
                  catch (e) {
                    return
                  }
                  }}
              </tr>
            </thead>
            <tbody>
              {historyData.map((transaction, i) => (
                <tr key={i} className={styles.tablerow}>
                  {Object.values(historyData[i]).map((value, j) => {
                    return (
                      <th key={j} className={styles.tablecolumn}>
                        {value}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <LiveAnbox />
    </div>
  );
};

export default History;
