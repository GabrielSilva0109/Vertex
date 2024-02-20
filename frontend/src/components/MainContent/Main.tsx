import React from 'react'
import styled from 'styled-components'
import creditCardImage from './credit-card.png'

const Container = styled.div`
    display: flex;
    background: black;
    color: white;
    justify-content: center;
    align-items: center;
`
const LeftContainer = styled.div`
    display block;
`

const TitleMain = styled.h1`
    font-size: 2.8rem;
    text-align: start;
`

const TextMain = styled.p`
    font-size: 1.2rem;
    text-align: start;
    color: gray;
    font-weight: 600;
`

const RightContainer = styled.div`
    display flex;
`

const Image = styled.img`
    width: 500px;
    height: auto;
`

const Main: React.FC = () => {
  return (
    <Container>
        <LeftContainer>
            <TitleMain>Seu universo financeiro<br/> em um só lugar</TitleMain>
            <TextMain>Ações, criptomoedas, fundos de investimento, renda fixa <br />
                e muito mais. Diversifique seu portfólio, maximize seus retornos e <br />
                acompanhe tudo em tempo real com nossa plataforma intuitiva.</TextMain>
        </LeftContainer>
        <RightContainer>
            <Image  src={creditCardImage} />
        </RightContainer>
    </Container>
  )
}

export default Main
