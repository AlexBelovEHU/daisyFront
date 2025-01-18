/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./Example.css";
import frame from "../../assets/Frame_4644.png";

const Example = ({ characters }) => (
  <div className="container">
    <header>
      <div className="profile">
        <img src={frame} alt="Profile" />
        <button>Депозит</button>
        <button>Профиль</button>
      </div>
    </header>

    <div className="main-content">
      {characters.map((item) => (
        <div key={item.id} className="box_container">
          <div className="box">{item.name}</div>
          <img src={item.image}></img>
        </div>
      ))}
    </div>
  </div>
);

export default Example;
