import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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
`;

const ModalContent = styled.div`
    background: #515151;
    padding: 20px;
    border-radius: 10px;
`;

const BtnClose = styled.button`
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: red;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
        background: #a30000;
    }
`;

const Title = styled.h1``;

const InfoLabel = styled.p`
    margin: 5px 0;
`;

const Loader = styled.div`
    border: 4px solid #f3f3f3; /* Light grey */
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
`;

const ErrorMsg = styled.p`
    color: red;
`;

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, cryptoName }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [cryptoData, setCryptoData] = useState<any>(null);

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
                    <Title>{cryptoName}</Title>
                    {loading && <Loader />}
                    {error && <ErrorMsg>{error}</ErrorMsg>}
                    {cryptoData && (
                        <>
                            <InfoLabel>Descrição: {cryptoData.description?.en}</InfoLabel>
                            <InfoLabel>Ranking: {cryptoData.market_cap_rank}</InfoLabel>
                            <InfoLabel>Fornecimento Circulante: {cryptoData.market_data.circulating_supply}</InfoLabel>
                            <InfoLabel>Fornecimento Máximo: {cryptoData.market_data.max_supply}</InfoLabel>
                            <InfoLabel>Fornecimento Total: {cryptoData.market_data.total_supply}</InfoLabel>
                            <InfoLabel>Data de Lançamento: {cryptoData.genesis_date}</InfoLabel>
                            <InfoLabel>Desenvolvedor: {cryptoData.developer_data?.developer}</InfoLabel>
                            <InfoLabel>Comunidades Sociais:</InfoLabel>
                            {cryptoData.links && cryptoData.links.homepage && (
                                cryptoData.links.homepage.map((link: string, index: number) => (
                                    <InfoLabel key={index}><a href={link} target="_blank" rel="noopener noreferrer">{link}</a></InfoLabel>
                                ))
                            )}
                            <InfoLabel>Mercados de Negociação: {cryptoData.market_data?.markets.map((market: any) => market.name).join(', ')}</InfoLabel>
                        </>
                    )}

                    <BtnClose onClick={onClose}>x</BtnClose>
                </ModalContent>
            </ModalContainer>
        </>
    );
};

export default Modal;
