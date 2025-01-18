import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from './components/Abouts/Abouts';
import NotFound from './components/NotFound/NotFound';
import LoginPage from './pages/Login/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import BoxOpenPage from './pages/BoxOpenPage/BoxOpenPage'
import AccountPage from './pages/AccountPage/AccountPage';
import DepositFail from './components/DepositFail/DepositFail';
import DepositSuccess from './components/DepositSuccess/DepositSuccess';
import GoogleLogin from './components/GoogleLogin/GoogleLogin';
import FAQ from './components/FAQ/FAQ';
import CookiePolicy from './components/Cookies/CookiePolicy';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import ProvablyFair from './components/ProvablyFair/ProvablyFair';
import TnC from './components/TnC/TnC';
import AllBoxesPage from './pages/AllBoxesPage/AllBoxesPage';
import LoadingView from './components/LoadingView/LoadingView';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/box/:box_id?" element={<BoxOpenPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/depositfail" element={<DepositFail />} />
        <Route path="/depositsuccess" element={<DepositSuccess />} />
        <Route path='/google' element={<GoogleLogin />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='/cookies' element={<CookiePolicy />} />
        <Route path='/privacypolicy' element={<PrivacyPolicy />} />
        <Route path='/provablyfair' element={<ProvablyFair />} />
        <Route path='/termsandconditions' element={<TnC />} />
        <Route path='/allboxes' element={<AllBoxesPage />} />
        <Route path='/loading' element={<LoadingView></LoadingView>}/>  
      </Routes>
    </Router>
  );
};

export default App;
