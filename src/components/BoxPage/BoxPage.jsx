// src/CaseScroll.js
import React, { useState, useEffect, useRef } from 'react';
import './BoxPage.css';
import '../../components/LiveAnbox/LiveAnbox';
import LiveAnbox from '../../components/LiveAnbox/LiveAnbox';
import cord from '../../assets/cord.png';
import longcord from '../../assets/longcord.png';
import mouse from '../../assets/mouse.png';
import phone from '../../assets/phone.png';
import laptop from '../../assets/laptop.png';
import purpleArrows from '../../assets/purpleboxarrows.png'

const itemsget = [
  { name: 'Cord', rarity: 'gray', image: cord },
  { name: 'A long cord', rarity: 'red', image: longcord },
  { name: 'Mouse', rarity: 'pink', image: mouse },
  { name: 'Phone', rarity: 'yellow', image: phone },
  { name: 'Laptop', rarity: 'yellow', image: laptop },
];

function shuffle(itemsin, num, winner, winnerpos) {
  var itemsout = [];
  for (let i = 0; i < num; i++) {
    if (winner !== 'no winner' && i == winnerpos) {
      itemsout = itemsout.concat(winner);
    }
    else {
      itemsout = itemsout.concat(itemsin[Math.floor(Math.random() * (itemsin.length))]);
    }
  }
  return itemsout
}
function addmore(previtems, itemsin, num, winner, winnerpos) {
  var itemsout = previtems;
  for (let i = previtems.length; i < previtems.length + num; i++) {
    if (winner !== 'no winner' && i == winnerpos) {
      itemsout = itemsout.concat(winner);
    }
    else {
      itemsout = itemsout.concat(itemsin[Math.floor(Math.random() * (itemsin.length))]);
    }
  }
  return itemsout
}


const length = 100;
const marginwinner = 4;
const minwinner = 20;
var distance = 50;

const itemsonscreen=3; //set to be odd

var winnerPos = Math.floor(Math.random() * (length - 1 - marginwinner - minwinner) + minwinner);
const winner = { name: 'Cord', rarity: 'pink', image: cord };


var items = shuffle(itemsget, length, winner, winnerPos);
var speed = 50;
const subdivisions = 5;
var justalittlemoreplease = Math.floor(Math.random() * (subdivisions - 1));

const CaseScroll = () => {
  const [position, setPosition] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [result, setResult] = useState(null);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const startScrolling = () => {
    winnerPos = (items.length) + Math.floor(Math.random() * (length - 1 - marginwinner - minwinner) + minwinner);
    distance = winnerPos * subdivisions - position;
    items = addmore(items, itemsget, length, winner, winnerPos);
    justalittlemoreplease = Math.floor(Math.random() * (subdivisions - 1));

    //setPosition(0); // Reset position
    setIsScrolling(true);

  };
  if (Math.floor((position - justalittlemoreplease + itemsonscreen / 2 * subdivisions) / subdivisions) == winnerPos) { //on hitting the win item
    if (isScrolling) {
      setIsScrolling(false)
      setTimeout(() => {
        setResult(items[Math.floor((position + itemsonscreen / 2 * subdivisions) / subdivisions)]);
      }, speed)
    }
  }
  useEffect(() => {
    if (isScrolling) {
      speed = 50;

      const scroll = () => {
        setPosition((prevPosition) => {
          const nextPosition = (prevPosition + 1);
          distance = winnerPos * subdivisions - prevPosition
          speed = 40 * length / distance; // Increase speed (slowing down)
          return nextPosition;
        });
        intervalRef.current = setTimeout(scroll, speed);
      };

      intervalRef.current = setTimeout(scroll, speed);


    } else {
      clearTimeout(intervalRef.current);
    }


    return () => clearTimeout(intervalRef.current);;
  }, [isScrolling]);


  return (
    <div id='containerroulette'>
      <div className="case-scroll">
        <a href='/' style={{ textDecoration: "none", textAlign: "start", color: "black", fontWeight: "600", marginBottom: "20px" }}>← Back</a>
        <div style={{ position: 'relative', display: 'grid', marginTop: "20px" }}>
          <div id='purple-arrows'><img style={{ height: '100%' }} src={purpleArrows}></img></div>
          <div className='gray-bg'>
            <div className='white-bg'>
              <div className="case-scroll-container" style={{
                transform: `translateX(-${position * 100/subdivisions/items.length}%)`,
                transition: `transform ${speed}ms ${distance <= 4 ? ("linear") : ("linear")}`
              }}>
                {items.map((item, index) => (
                  <div
                    key={index}
                    className={`item ${item.rarity} ${index === Math.floor((position + (itemsonscreen) / 2 * subdivisions) / subdivisions) ? 'highlight' : ''
                      }`}
                  >
                    <img className='itemImg' src={item.image}></img>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </div>
        <button onClick={startScrolling} disabled={isScrolling}>Start Scrolling</button>
        {result && (
          <div className="result">
            <h2>Congratulations!</h2>
            <p>
              You got a <span className={`result-item ${result.rarity}`}>{result.name}</span>
            </p>
          </div>

        )}
      </div>
      <LiveAnbox />
    </div>
  );
};

export default CaseScroll;
