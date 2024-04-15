import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import iconIA from '../Sections/img/IconChat.png';
import axios from "axios"


const slideIn = keyframes`
    0% {
        transform: translateY(-100%);
    }
    100% {
        transform: translateY(0);
    }
`

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
`

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
    background-color: #b0ff00;
    color: white;
    border-radius: 0 20px 20px 0;
    cursor: pointer;
    transition: background-color 0.3s;
    outline: none;

    &:hover {
        background-color: #80b900;
    }
`

const SendIcon = () => (
    <svg
        className="send-icon"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px" y="0px"
        viewBox="0 0 512 512"
        xmlSpace="preserve"
    >
        <g>
            <g>
                <path fill="#6B6C7B" d="M481.508,210.336L68.414,38.926c-17.403-7.222-37.064-4.045-51.309,8.287C2.86,59.547-3.098,78.551,1.558,96.808 L38.327,241h180.026c8.284,0,15.001,6.716,15.001,15.001c0,8.284-6.716,15.001-15.001,15.001H38.327L1.558,415.193 c-4.656,18.258,1.301,37.262,15.547,49.595c14.274,12.357,33.937,15.495,51.31,8.287l413.094-171.409 C500.317,293.862,512,276.364,512,256.001C512,235.638,500.317,218.139,481.508,210.336z"></path>
            </g>
        </g>
    </svg>
)

const Chat: React.FC = () => {
    const [inputText, setInputText] = useState("");
    const [chatHistory, setChatHistory] = useState<string[]>([]);



    return (
        <ChatBox>
            <h1>Chat IA</h1>

            <InputWrapper>
                <Input placeholder="Digite sua mensagem.."/>
                <SendButton><SendIcon /></SendButton>
            </InputWrapper>
        </ChatBox>
    )
}

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
