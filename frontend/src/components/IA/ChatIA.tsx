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
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition-duration: 0.3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
    background-color: white;
    text-decoration: none;
`;

const Img = styled.img`
    width: 35px;
`

const ChatBox = styled.div`
    position: absolute;
    top: 70px;
    bottom: 20px;
    right: 20px;
    width: 300px;
    height: 500px;
    background: #bebebf;
    color: black;
    border: none;
    border-radius: 5px;
    z-index: 9999;
    animation: ${slideIn} 0.4s ease forwards;
    transform: translateY(100%);
`

const InputWrapper = styled.div`
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    margin-top: 370px;
    position: relative;
    display: flex; 
`

const Input = styled.input`
    width: calc(100% - 60px); 
    height: 30px;
    padding: 5px 10px;
    border: none;
    border-radius: 20px 0px 0px 20px;
    outline: none;
    background-color: #f5f5f5;
    color: #333;
    font-size: 14px;
`

const SendButton = styled.button`
    width: 40px;
    height: 40px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 0 20px 20px 0;
    cursor: pointer;
    transition: background-color 0.3s;
    outline: none;

    &:hover {
        background-color: #0056b3;
    }
`


const Chat: React.FC = () => {
    return (
        <ChatBox>
            <h1>Chat IA</h1>

            <InputWrapper>
                <Input placeholder="Digite sua mensagem..."/>
                <SendButton>Enviar</SendButton>
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
            </BoxChat>
            {isChatOpen && <Chat />}
        </>
    );
};

export default ChatIA;
