/* eslint-disable eqeqeq */
import React from "react";

const GoogleLogin = () => {
  const b64DecodeUnicode = (str) =>
    // Going backwards: from bytestream, to percent-encoding, to original string.
    decodeURIComponent(
      atob(str)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );
  const googleAuth = () => {
    const urlSearchParams = new URLSearchParams(window.location);
    const params = Object.fromEntries(urlSearchParams.entries());

    if (params.pathname === "/google") {
      const userB64Data = params.search.slice(1).toString(); // get last path(b64 code) from url
      const decodedUserData = b64DecodeUnicode(userB64Data).replace(/'/g, '"'); // decoded user and permissons, prepare for json parse
      const userAuthObject = JSON.parse(decodedUserData);
      console.log(userAuthObject)
      localStorage.setItem('sessionToken', userAuthObject.token)
      if (localStorage.getItem('sessionToken') == userAuthObject.token) {
       window.location.href='/'
      }
      else {
        console.log("Error logging in",localStorage.getItem('sessionToken'),userAuthObject)
      }
    }
  };
  googleAuth()
  return <h1>Redirecting</h1>;
};
export default GoogleLogin;