import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import iconIA from '../Sections/img/IconChat.png';

const slideIn = keyframes`
    0% {
        transform: translateY(-100%);
    }
    100% {
        transform: translateY(0);
    }
`;

const BoxChat = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    overflow: hidden;
    transition-duration: 0.3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
    background-color: white;
    text-decoration: none;
`;

const Img = styled.img`
    width: 35px;
`;

const ChatBox = styled.div`
    position: absolute;
    bottom: calc(100% + 10px);
    right: 0;
    width: 300px;
    height: 500px;
    background: #0f172a;
    color: black;
    border: none;
    border-radius: 5px;
    z-index: 9999;
    animation: ${slideIn} 0.4s ease forwards;
    transform: translateY(-100%);
`;

const InputWrapper = styled.div`
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Input = styled.input`
    width: calc(100% - 80px); /* Ajuste para acomodar o botão */
    height: 40px;
    padding: 5px 10px;
    border: none;
    border-radius: 20px;
    outline: none;
    background-color: #f5f5f5;
    color: #333;
    font-size: 14px;
`;

const Button = styled.button`
    width: 60px;
    height: 40px;
    border: none;
    border-radius: 20px;
    background-color: #007bff;
    color: white;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;

// Chat component
const Chat: React.FC = () => {
    const sendMessage = () => {
        // Aqui você pode adicionar a lógica para enviar a mensagem
        console.log("Mensagem enviada");
    };

    return (
        <ChatBox>
            <InputWrapper>
                <Input placeholder="Digite sua mensagem..."/>
                <Button onClick={sendMessage}>Enviar</Button>
            </InputWrapper>
        </ChatBox>
    );
};

// ChatIA component
const ChatIA: React.FC = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <>
            <BoxChat onClick={toggleChat}>
                <Img src={iconIA}/>
                {isChatOpen && <Chat />}
            </BoxChat>
        </>
    );
};

export default ChatIA;
