import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LadingPage'; 
import LoginPage from './components/Login/LoginPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home/Home';
import Carteira from './components/Carteira/Carteira';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/carteira" element={<Carteira />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default AppRouter;
