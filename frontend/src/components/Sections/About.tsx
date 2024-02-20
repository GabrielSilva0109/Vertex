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
`
const Card = styled.div`
    background: #b0ff00;
    width: 78%;
    height: 400px;
    padding: 20px;
    margin: 20px;
    border-radius: 8px;
`

const Title = styled.div`
    font-size: 2.5rem;
    color: black;
    font-weight: bold;
    display: flex;
    align-items: center;
`

const About: React.FC = () => {
    return (
        <Container>
            <Card>
                <Title>
                  Vertex
                </Title>
            </Card>
        </Container>
    )
}

export default About