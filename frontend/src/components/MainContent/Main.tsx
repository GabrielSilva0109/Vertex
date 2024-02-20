import React from 'react'
import styled from 'styled-components'
import creditCardImage from './credit-card.png'

const Container = styled.div`
    display: flex;
    background: black;
    color: white;
    justify-content: center;
`
const LeftContainer = styled.div`
    display flex;
    justify-content: start;
`

const TitleMain = styled.h1`
    font-size: 2.5rem;
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
            <TitleMain>Seu universo financeiro<br/> ao seu alcance.</TitleMain>
            <p>Invista em ações, criptomoedas, fundos de investimento, renda fixa <br />
                e muito mais. Diversifique seu portfólio, maximize seus retornos e <br />
                acompanhe tudo em tempo real com nossa plataforma intuitiva.</p>
        </LeftContainer>

        <RightContainer>
            <Image  src={creditCardImage} />
            
        </RightContainer>
    </Container>
  )
}

export default Main
