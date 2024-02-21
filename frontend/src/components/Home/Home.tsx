import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const { state } = useLocation();
    const user = state?.user;

    const navigate = useNavigate();

    
    if (!user) {
        navigate('/login')
        return null
    }

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
