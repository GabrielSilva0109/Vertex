import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "../Header/NavBar";
import Content from "./Content";

const Home: React.FC = () => {
  const { state } = useLocation();
  const user = state?.user;

  const navigate = useNavigate();

  const redirectToLogin = async () => {
    if (!user || user === null) {
        toast.warning("Faça o login para acessar a página Home.")
        await navigate('/login')
    }
  };

  useEffect(() => {
    redirectToLogin();
  }, []);

  useEffect(() => {
    
  }, [user]);

  return (
    <div>
      <NavBar />
      <Content />
      {user && (
        <div>
          <p>Nome: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Home;

