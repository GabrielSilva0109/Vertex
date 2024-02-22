import React from "react"
import styled from "styled-components"
import iconAcoes from '../Sections/img/iconsAcoes.png'
import iconCoin from '../Sections/img/iconsCoin.png'
import iconBitcoin from '../Sections/img/iconsBitcoin.png'
import iconCard from '../Sections/img/iconsCard.png'
import iconDespesa from '../Sections/img/iconsDespesa.png'
import iconInvestimento from '../Sections/img/iconsInvestimento.png'
import iconSaldo from '../Sections/img/iconsSaldo.png' 


const Container = styled.div`
  display: flex;
  background: rgb(28, 28, 30);;
  width: 100%;
  height: 100vh;
  color: white;

  @media (max-width: 768px) {
    flex-direction: column;
}
`

const LeftContainer = styled.div`
    flex: 3; 
    border-radius: 10px;
    margin:20px;
    display: flex;  
    flex-direction: column;
    align-items: center;


`

const RightContainer = styled.div`
  flex: 1;
  border-radius: 10px;
  margin: 20px;
  gap: 10px;
  display: flex;
  flex-direction: column;
`

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

const Box = styled.div`
    width: 30%;
    height: 150px;
    background: #2C2C2E;
    border-radius: 10px;
    padding: 5px;
`

const Main = styled.main`
    display: flex;
    justify-content: center;
    background: #2C2C2C;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    margin-top: 10px;
`

const BoxRight = styled.div`
    background: #2C2C2E;
    border-radius: 10px;
    padding: 5px;
    height: 48%;
`

const Title = styled.h1`
    color: white;
    font-size: 1.5rem;
    padding: 0px;
    margin:0px;
    display: flex;
    align-items: center;
    justify-content: start;

    @media (max-width: 768px) {
        font-size: 1.2rem;
    }
`

const Icon = styled.img`
    width: 35px;
`

const Content: React.FC = () =>{
    return (
        <Container>

            <LeftContainer>
                <Top>
                    <Box>
                    <Title>
                        <Icon src={iconSaldo} />
                        Saldo
                    </Title>
                    </Box>
                    <Box>
                    <Title>
                        <Icon src={iconInvestimento} />
                        Investimento
                    </Title>
                    </Box>
                    <Box>
                    <Title>
                        <Icon src={iconDespesa} />
                        Despesa
                        </Title>
                    </Box>
                </Top>

                <Main>
                    <h1>Carteira grafico</h1>

                </Main>
            </LeftContainer>

            <RightContainer>
                <BoxRight>
                    <Title>
                        <Icon src={iconAcoes} />
                        Ações
                    </Title>
                </BoxRight>
                <BoxRight>
                    <Title>
                        <Icon src={iconBitcoin} />
                        Crypto
                    </Title>
                </BoxRight>
            </RightContainer>

        </Container>
    )
}

export default Content