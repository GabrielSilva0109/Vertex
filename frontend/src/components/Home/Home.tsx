import React from "react"
import Header from "../Header/Header"
import { useLocation } from "react-router-dom";


const Home: React.FC = () => {
    const { state } = useLocation();
    const user = state
    console.log(user)
    return (
        <div>
            <h2>Bem-vindo à página Home</h2>
            
            {user && (
                <div>
                    <p>Nome: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            )}
        </div>
    );
};

export default Home