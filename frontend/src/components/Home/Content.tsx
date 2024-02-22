import React from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  background: rgb(28, 28, 30);;
  width: 100%;
  height: 100vh;
  color: white;
`

const LeftContainer = styled.div`
  flex: 3; 
  border-radius: 10px;
  margin:20px;
`

const RightContainer = styled.div`
  flex: 1;
  border-radius: 10px;
  margin:20px;
`

const Top = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
`

const Box = styled.div`
    width: 250px;
    height: 150px;
    background: #2C2C2E;
    margin-top: 30px;
    border-radius: 10px;

`

const Main = styled.main`
    background: #2C2C2C;
    width: 100;
`

const BoxRight = styled.div`
    height: 350px;
    background: #2C2C2E;
    margin-top: 30px;
    border-radius: 10px;
`

const Content: React.FC = () =>{
    return (
        <Container>

            <LeftContainer>
                <Top>
                    <Box>
                        <h1>Saldo</h1>
                    </Box>
                    <Box>
                        <h1>Investimentos</h1>
                    </Box>
                    <Box>
                        <h1>Dividas</h1>
                    </Box>
                </Top>

                <Main>
                    <h1>Cardeira grafico</h1>

                </Main>
            </LeftContainer>

            <RightContainer>
                <BoxRight>
                    <h1>Ações</h1>
                </BoxRight>
                <BoxRight>
                    <h1>Crypto</h1>
                </BoxRight>
            </RightContainer>

        </Container>
    )
}

export default Content