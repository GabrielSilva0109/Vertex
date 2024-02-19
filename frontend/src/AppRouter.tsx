import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage' 

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<LandingPage />} />
    
      </Switch>
    </Router>
  );
};

export default AppRouter;
