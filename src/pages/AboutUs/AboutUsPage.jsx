import React from "react";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Abouts from "../../components/Abouts/Abouts";
import StickyMenuTop from "../../components/StickyMenuTop/StickyMenuTop"
 

function AboutUsPage() {
  const loading = useSelector((state) => state.example.loading);

  return (
    <div className="content-component__wrapper">
      {loading ? (
        <div> Загрузка...</div>
      ) : (
        <div className="App">
          <StickyMenuTop balance='Unset'></StickyMenuTop>
          <Abouts></Abouts>
          <Footer></Footer>
        </div>
      )}
    </div>
  );
}

export default AboutUsPage;