import React from 'react'
import styled from 'styled-components'
import iconAcoes from './img/iconsAcoes.png'
import iconCoin from './img/iconsCoin.png'
import iconBitcoin from './img/iconsBitcoin.png'
import iconCard from './img/iconsCard.png'

const Container = styled.div`
    width: 95%;
    display: flex;
    justify-content: center;
    align-itens: center;
    background: white;
`
const CardLeft = styled.div`
    float: left;
    background: #b0ff00;
    width: 60%;
    height: 400px;
    padding: 20px;
    margin: 20px;
    border-radius: 8px;
`

const CardRight = styled.div`
    float: right;
    width: 27%;
    display: flex;
    align-itens: start;
`

const Title = styled.div`
    font-size: 1.2rem;
    color: black;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 10px;
`

const About: React.FC = () => {
    return (
        <Container>
            <CardLeft>
                <Title>
                  Vertex
                </Title>
            </CardLeft>
            <CardRight>
                <Title>Sobre</Title>
            </CardRight>
        </Container>
    )
}

export default About