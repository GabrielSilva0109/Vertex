import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage/LadingPage' 

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>    
    </Router>
  )
}

export default AppRouter
