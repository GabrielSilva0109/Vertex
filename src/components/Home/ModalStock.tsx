import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import apple from '../../IMG/apple.png'
import amazon from '../../IMG/amazonIcon.png'
import google from '../../IMG/googleIcon.png'
import microsoft from '../../IMG/microsoftIcon.png'
import tesla from '../../IMG/teslaIcon.png'
import netflix from '../../IMG/netflixIcon.png'
import meta from '../../IMG/facebookIcon.png'
import nvidia from '../../IMG/nvidiaIcon.png'
import intel from '../../IMG/intelcon.png'
import paypal from '../../IMG/paypalIcon.png'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    stockName: string;
}

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
`

const ModalContent = styled.div`
    background: #1e1e1e;
    width: 400px;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);

    @media(max-width: 768px){
        width: 250px;
    }
`

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
`

const BtnClose = styled.button`
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ff4141;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 20px;
    outline: none;

    &:hover {
        background: #d63030; 
    }
`

const Title = styled.h1`
    color: #fff; /* White */
    font-size: 24px;
    margin-bottom: 20px;
`

const InfoLabel = styled.p`
    color: #ccc; 
    font-size: 16px;
    margin: 10px 0;
`

const Loader = styled.div`
    border: 4px solid #f3f3f3; /* Light gray */
    border-top: 4px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 2s linear infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`

const ErrorMsg = styled.p`
    color: #ff6b6b; /* Light red */
    font-size: 14px;
`

const Icon = styled.img`
  width: 35px;
  border-radius: 50%;
`

const ModalStock: React.FC<ModalProps> = ({ isOpen, onClose, stockName }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('')

    const symbols: { [key: string]: string } = {
        "Apple": "AAPL",
        "Amazon": "AMZN",
        "Google": "GOOGL",
        "Microsoft": "MSFT",
        "Tesla": "TSLA",
        "Netflix": "NFLX",
        "Meta": "META",
        "Nvidia": "NVDA",
        "Paypal": "PYPL",
        "Intel": "INTC"
    }
    
    //Stocks
    const fetchStockData = async (symbol: string) => {
        try {
          const ApiKey = "co6mvr9r01qj6a5mbgl0co6mvr9r01qj6a5mbglg"
          const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${ApiKey}`)
  
          if (!response.ok) {
            throw new Error("Erro ao buscar preço das ações")
          }
  
          const data = await response.json()
          const previousPrice = data.pc
          const currentPrice = data.c
          const priceChangePercentage = ((currentPrice - previousPrice) / previousPrice) * 100
  
          return { currentPrice, priceChangePercentage }
        } catch (error) {
          console.error("Ocorreu um erro ao obter os dados:", error)
          return { currentPrice: 0, priceChangePercentage: 0 }
        }
    }

    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            setError('');
            const symbol = symbols[stockName];
            fetchStockData(symbol)
                .then(() => {
                    setLoading(false);
                })
                .catch(error => {
                    setError('Erro ao buscar dados da ação. Por favor, tente novamente mais tarde.');
                    setLoading(false);
                });
        }
    }, [isOpen, stockName])

    if (!isOpen) return null

    return (
        <>
            <ModalContainer>
                <ModalContent>
                    <Top>
                        <Icon src={getStockIcon(stockName)}/>
                        <Title>{stockName}</Title>
                        <BtnClose onClick={onClose}>x</BtnClose>
                    </Top>
                    {loading && <Loader />}
                    {error && <ErrorMsg>{error}</ErrorMsg>}
                </ModalContent>
            </ModalContainer>
        </>
    )
}

export default ModalStock

function getStockIcon(stockName: string): string {
    switch (stockName) {
      case "Apple":
        return apple;
      case "Amazon":
        return amazon;
      case "Google":
        return google;
      case "Microsoft":
        return microsoft;
      case "Tesla":
        return tesla;
      case "Netflix":
            return netflix
      case "Meta":
        return meta
      case "Nvidia":
        return nvidia
      case "Paypal":
        return paypal
      case "Intel":
        return intel        
      default:
        return ""
    }
}
