import React from 'react'
import styled from 'styled-components'
import iconAcoes from './img/iconsAcoes.png'
import iconCoin from './img/iconsCoin.png'
import iconBitcoin from './img/iconsBitcoin.png'
import iconCard from './img/iconsCard.png'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-itens: center;
    background: white;
    width: 95%;
`
const Card = styled.div`
    background: #e9e8e8;
    width: 200px;
    height: 200px;
    padding: 20px;
    margin: 20px;
    border-radius: 8px;
`

const Title = styled.div`
    font-size: 1.2rem;
    color: black;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 10px;
`

const Icon = styled.img`
    width: 40px;
    height: 40px;
`
 

const Cards: React.FC = () => {
    return (
        <Container>
            <Card>
                <Title>
                    <Icon src={iconAcoes} />
                    Ações
                </Title>
            </Card>
            <Card>
                <Title>
                    <Icon src={iconCoin} />
                    Moedas
                </Title>
            </Card>
            <Card>
                <Title>
                    <Icon src={iconBitcoin} />
                    Crypto
                </Title>
            </Card>
            <Card>
                <Title>
                    <Icon src={iconCard} />
                    Cartão de Credito
                </Title>
            </Card>
        </Container>
    )
}

export default Cards