/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styles from "./ItemWonPopup.module.css";
import cross from "../../assets/close_button-removebg-preview.png";


var itemsget = [];
var boxInfo = [];
try {
  boxInfo = JSON.parse(localStorage.getItem("currentBoxInfo"));
  try {
    boxInfo.prizes.forEach((prize, i) => {
      const rarities = ["red", "yellow", "grey", "pink"];
      const rarity = rarities[i % rarities.length];
      itemsget.push({
        name: prize.name,
        rarity: rarity,
        image: prize.image,
        price: prize.price,
        id: prize.prize_id,
        probability: prize.odd,
        description: prize.description,
      });
    });
  } catch {
    console.log("No items rn fr fr");
  }
} catch {
  console.log("no boxes rn fr fr");
}

function ItemWonPopup({ closePopup, itemWon, playGame }) {


  return (
    <div className={styles.popup}>
      <div className={styles.popupinner}>
        <div className={styles.popupTop}>
          <p id={styles.probability}>Probability:{itemWon.probability}</p>
          <button onClick={closePopup} className={styles.closebutton}>
            <img
              style={{ height: "20px", width: "20px" }}
              alt="x"
              src={cross}
            ></img>
          </button>

          <div id={styles.wonImg}>
            <img
              style={{ height: "100%", width: "100%", objectFit: "contain" }}
              src={window.clientConfig.imageUrl + itemWon.image}
            ></img>
          </div>

          <div id={styles.price}>$ {itemWon.price}</div>
        </div>
        <div className={styles.popupBottom}>
          <p id={styles.name}>{itemWon.name}</p>
          <p id={styles.description}>{itemWon.description}</p>

          <button className={styles.submitbutton} onClick={playGame}>
            Get the product for $ {boxInfo.price}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemWonPopup;
