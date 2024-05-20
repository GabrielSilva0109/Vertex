import React from 'react'
import styled from 'styled-components'
import iconAcoes from '../../IMG/iconsAcoes.png'
import iconCoin from '../../IMG/iconsCoin.png'
import iconBitcoin from '../../IMG/iconsBitcoin.png'
import iconCard from '../../IMG/iconsCard.png'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1c1c1e;
    flex-wrap: wrap; 
    padding: 20px; 
`

const Card = styled.div`
    background: black;
    width: 200px;
    height: 280px;
    padding: 20px;
    margin: 20px;
    border-radius: 8px;
    text-align: start;
    flex-direction: column;
    gap: 10px;
    flex: 1; 
`

const Title = styled.div`
    padding: 5px;
    font-size: 1.2rem;
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    border-bottom: 1px solid gray;
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
    )
}

export default Cards;
