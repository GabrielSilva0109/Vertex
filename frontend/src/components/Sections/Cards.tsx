import React from 'react';
import styled from 'styled-components';
import iconAcoes from './img/iconsAcoes.png';
import iconCoin from './img/iconsCoin.png';
import iconBitcoin from './img/iconsBitcoin.png';
import iconCard from './img/iconsCard.png';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #2C2C2E;
    flex-wrap: wrap; 
    padding: 20px; 
`;

const Card = styled.div`
    background: #e9e8e8;
    width: 200px;
    height: 280px;
    padding: 20px;
    margin: 20px;
    border-radius: 8px;
    text-align: start;
    flex-direction: column;
    gap: 10px;
    flex: 1; 
`;

const Title = styled.div`
    font-size: 1.2rem;
    color: black;
    font-weight: bold;
    display: flex;
    align-items: center;
`

const Icon = styled.img`
    width: 40px;
    height: 40px;
`

const Description = styled.p`
    font-size: 1rem;
    color: gray;
    font-weight: bold;
`

const Cards: React.FC = () => {
    return (
        <Container>
            <Card>
                <Title>
                    <Icon src={iconAcoes} />
                    Ações
                </Title>
                <Description>Negocie e invista no mercado financeiro.</Description>
                <Description>Acompanhe o desempenho das empresas.</Description>
                <Description>Receba notificações sobre oportunidades de investimento.</Description>
            </Card>
            <Card>
                <Title>
                    <Icon src={iconCoin} />
                    Moedas
                </Title>
                <Description>Compre e venda moedas estrangeiras.</Description>
                <Description>Aproveite taxas de câmbio competitivas.</Description>
                <Description>Explore diferentes opções de moedas disponíveis.</Description>
            </Card>
            <Card>
                <Title>
                    <Icon src={iconBitcoin} />
                    Crypto
                </Title>
                <Description>Negocie as maiores criptomoedas do mercado.</Description>
                <Description>Monitore a volatilidade do mercado de criptomoedas.</Description>
                <Description>Receba insights sobre as últimas tendências</Description>
            </Card>
            <Card>
                <Title>
                    <Icon src={iconCard} />
                    Cartão de Crédito
                </Title>
                <Description>Gerencie seu cartão de crédito e suas transações.</Description>
                <Description>Acompanhe os gastos e receba alertas personalizados.</Description>
                <Description>Sistema de pontuação.</Description>
            </Card>
        </Container>
    );
};

export default Cards;
