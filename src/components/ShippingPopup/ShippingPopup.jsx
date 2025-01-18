/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React from 'react';
import styles from './ShippingPopup.module.css'
import { useState } from 'react';
import { userGet } from "../../redux/actions/usergetAction";
import { useredit } from '../../redux/actions/userEditAction'
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

var defaultUser = { email: "", password: "", name: '', lastName: '', code: '', address: '', country: '', state: '', city: '', address_2: '', phoneNumber: '' }

const ShippingPopup = ({ cashOut,withdraw }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.example.loading);
  const characters = useSelector((state) => state.example.payload);
  const payloadType = useSelector((state) => state.example.payloadType);

  const handleEdit = (email, password, shippingAddress) => {
    dispatch(useredit(email === undefined ? ('') : (email), password === undefined ? ('') : (password), shippingAddress === undefined ? ([]) : (shippingAddress)))
    localStorage.setItem("shippingAdress", JSON.stringify(shippingAddress))
    //closePopup()
  }

  const [email, setEmail] = useState('');
  const [password] = useState('');

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [code, setCode] = useState('');
  const [address_2, setaddress_2] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const editName=(e)=>{
    const value = e.target.value;
    const lastChar = value[value.length - 1];
    const allowedCharacters = /^[a-zA-Z0-9\s]$/;
    if (allowedCharacters.test(lastChar)) {
      setName(value)
    } else {
      e.preventDefault();
    }
  }
  const editLastName=(e)=>{
    const value = e.target.value;
    const lastChar = value[value.length - 1];
    const allowedCharacters = /^[a-zA-Z0-9\s]$/;
    if (allowedCharacters.test(lastChar)) {
      setLastName(value)
    } else {
      e.preventDefault();
    }
  }
  const editAddress=(e)=>{
    const value = e.target.value;
    const lastChar = value[value.length - 1];
    const allowedCharacters = /^[a-zA-Z0-9\s]$/;
    if (allowedCharacters.test(lastChar)) {
      setAddress(value)
    } else {
      e.preventDefault();
    }
  }
  const editCountry=(e)=>{
    const value = e.target.value;
    const lastChar = value[value.length - 1];
    const allowedCharacters = /^[a-zA-Z0-9\s]$/;
    if (allowedCharacters.test(lastChar)) {
      setCountry(value)
    } else {
      e.preventDefault();
    }
  }
  const editState=(e)=>{
    const value = e.target.value;
    const lastChar = value[value.length - 1];
    const allowedCharacters = /^[a-zA-Z0-9\s]$/;
    if (allowedCharacters.test(lastChar)) {
      setState(value)
    } else {
      e.preventDefault();
    }
  }
  const editCity = (e) => {
    const value = e.target.value;
    const lastChar = value[value.length - 1];
    const allowedCharacters = /^[a-zA-Z0-9\s]$/;
    if (allowedCharacters.test(lastChar)) {
      setCity(value)
    } else {
      e.preventDefault();
    }
  }
  const editCode=(e)=>{
    const value = e.target.value;
    const lastChar = value[value.length - 1];
    const allowedCharacters = /^[a-zA-Z0-9\s]$/;
    if (allowedCharacters.test(lastChar)) {
      setCode(value)
    } else {
      e.preventDefault();
    }
  }
  const editAddress2=(e)=>{
    const value = e.target.value;
    const lastChar = value[value.length - 1];
    const allowedCharacters = /^[a-zA-Z0-9\s]$/;
    if (allowedCharacters.test(lastChar)) {
      setaddress_2(value)
    } else {
      e.preventDefault();
    }
  }
  const editPhoneNumber=(e)=>{
    const value = e.target.value;
    const lastChar = value[value.length - 1];
    const allowedCharacters = /^[a-zA-Z0-9\s+]$/;
    if (allowedCharacters.test(lastChar)) {
      setPhoneNumber(value)
    } else {
      e.preventDefault();
    }
  }
  useEffect(() => {
    dispatch(userGet());
  }, [dispatch]);

  useEffect(() => {
    if (characters[0] == "NotLoggedIn") {
      console.log("NotLoggedIn")
    } else {
      if (payloadType == "userGet") {
        console.log('userInfo', characters)
        setEmail(defaultUser.email === undefined ? ('') : (characters.email))
        setEmail(defaultUser.password === undefined ? ('') : (characters.password))
        try {
          setName(defaultUser.name === undefined ? ('') : (characters.shipping_address.name))
          setLastName(defaultUser.lastName === undefined ? ('') : (characters.shipping_address.lastName))
          setAddress(defaultUser.address === undefined ? ('') : (characters.shipping_address.address))
          setCountry(defaultUser.country === undefined ? ('') : (characters.shipping_address.country))
          setState(defaultUser.state === undefined ? ('') : (characters.shipping_address.state))
          setCity(defaultUser.city === undefined ? ('') : (characters.shipping_address.city))
          setCode(defaultUser.code === undefined ? ('') : (characters.shipping_address.code))
          setaddress_2(defaultUser.address_2 === undefined ? ('') : (characters.shipping_address.address_2))
          setPhoneNumber(defaultUser.phoneNumber === undefined ? ('') : (characters.shipping_address.phoneNumber))
          localStorage.setItem("shippingAdress", JSON.stringify(defaultUser))
        }
        catch (e) { /* empty */ }
      }
      else {
        console.log(characters)
        console.log('Unknown Payload')
      }
    }
  }, [loading, characters])



  return (
    <div className='popup'>
      <div className={styles.stickymenu}>
        <h1 className={styles.fatheader}>Shipping address</h1>
        <p id={styles.shippingprompt}>Please fill in your data in latin characters so postal services could proceed with delivery. Thank you for your cooperation.</p>
        <form id={styles.personaldata}>
          <input className={styles.inputAccount} type="text" value={name} onChange={e => editName(e)} placeholder="First name" />
          <input className={styles.inputAccount} type="text" value={lastName} onChange={e => editLastName(e)} placeholder="Last name" />
          <input className={styles.inputAccount} type="text" value={address} onChange={e => editAddress(e)} placeholder="Address" />
          <input className={styles.inputAccount} type="text" value={country} onChange={e => editCountry(e)} placeholder="Country" />
          <input className={styles.inputAccount} type="text" value={state} onChange={e => editState(e)} placeholder="State" />
          <input className={styles.inputAccount} type="text" value={city} onChange={e => editCity(e)} placeholder="City" />
          <input className={styles.inputAccount} type="text" value={code} onChange={e => editCode(e)} placeholder="Code" />
          <input className={styles.inputAccount} type="text" value={address_2} onChange={e => editAddress2(e)} placeholder="Address 2" />
          <input className={styles.inputAccount} type="text" value={phoneNumber} onChange={e => editPhoneNumber(e)} placeholder="Phone number" />

        </form>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className={styles.confirmButton} onClick={() => { handleEdit(email, password, { name: name, lastName: lastName, address: address, country: country, state: state, city: city, code: code, address_2: address_2, phoneNumber: phoneNumber });withdraw() }}>Confirm</button>
          <button className={styles.cashoutbtn} onClick={cashOut}>Better cash out</button>
        </div>
      </div>
    </div>
  );
};

export default ShippingPopup;
