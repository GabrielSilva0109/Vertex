import React, { useEffect, useState } from 'react'
import styled from 'styled-components'


import axios from "axios"
import bnb from '../../IMG/bnb2.svg'
import btc from '../../IMG/bitcoin.svg'
import cardano from '../../IMG/cardano.svg'
import eth from '../../IMG/eth.svg'
import solana from '../../IMG/solana.png'
import xrp from '../../IMG/xrp.svg'
import litecoin from '../../IMG/litecoin.png'
import monero from '../../IMG/monero.png'
import polkadot from '../../IMG/polkadot.png'
import uniswap from '../../IMG/uniswap.png'
import gmx from '../../IMG/gmx.png'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    cryptoName: string;
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

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, cryptoName }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [cryptoData, setCryptoData] = useState<any>(null)

    const formatarValor = (valor: number): string => {
        return valor.toLocaleString('pt-BR');
    }

    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            setError('');
            fetch(`https://api.coingecko.com/api/v3/coins/${cryptoName}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao buscar dados da criptomoeda');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    setCryptoData(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Erro ao buscar dados da criptomoeda:', error);
                    setError('Erro ao buscar dados da criptomoeda. Por favor, tente novamente mais tarde.');
                    setLoading(false);
                });
        }
    }, [isOpen, cryptoName])

    if (!isOpen) return null

    return (
        <>
            <ModalContainer>
                <ModalContent>
                    <Top>
                        <Icon src={getCryptoIcon(cryptoName)} />
                        <Title>{cryptoName.toUpperCase()}</Title>
                        <BtnClose onClick={onClose}>x</BtnClose>
                    </Top>
                    {loading && <Loader />}
                    {error && <ErrorMsg>{error}</ErrorMsg>}
                    {cryptoData && (
                        <>
                            <InfoLabel>Ranking: {cryptoData.market_cap_rank}</InfoLabel>
                            <InfoLabel>Fornecimento Circulante: {formatarValor(cryptoData.market_data.circulating_supply)}</InfoLabel>
                            <InfoLabel>Fornecimento Máximo: {formatarValor(cryptoData.market_data.max_supply)}</InfoLabel>
                            <InfoLabel>Fornecimento Total: {formatarValor(cryptoData.market_data.total_supply)}</InfoLabel>
                            <InfoLabel>Preço atual: ${cryptoData.market_data.current_price.usd}</InfoLabel>
                            <InfoLabel>Variação 24h: {cryptoData.market_data.price_change_percentage_24h}%</InfoLabel>
                            <InfoLabel>Volume 24h: ${cryptoData.market_data.total_volume.usd}</InfoLabel>
                            <InfoLabel>Data de Lançamento: {cryptoData.genesis_date}</InfoLabel>
                        </>
                    )}
                </ModalContent>
            </ModalContainer>
        </>
    )
}

export default Modal

function getCryptoIcon(cryptoId: string): string {
    switch (cryptoId) {
      case "bitcoin":
        return btc;
      case "ethereum":
        return eth;
      case "binancecoin":
        return bnb;
      case "cardano":
        return cardano;
      case "solana":
        return solana;
      case "ripple":
            return xrp
      case "litecoin":
        return litecoin
      case "monero":
        return monero
      case "polkadot":
        return polkadot
      case "uniswap":
        return uniswap
      case "gmx":
        return gmx  
        
      default:
        return ""
    }
}