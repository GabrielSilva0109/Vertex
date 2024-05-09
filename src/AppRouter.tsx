import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage/LadingPage';
import LoginPage from './components/Login/LoginPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './components/Home/Home'
import Carteira from './components/Carteira/Carteira'
import Investimento from './components/Investimento/Invetimento'
import Noticias from './components/Noticias/Noticias'

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/carteira" element={<Carteira />} />
        <Route path="/Investimentos" element={<Investimento />} />
        <Route path="/noticias" element={<Noticias />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default AppRouter;
