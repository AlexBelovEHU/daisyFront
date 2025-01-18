import React from "react";
import logo from "../../assets/logo.svg"

const LoadingView = () => {
  return (
    <>
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100vw',height:'100vh'}}>
        <img alt={"Anboxme"} src={logo} style={{scale:'2'}}></img>
      </div>
    </>
  )
};

export default LoadingView;
