import React from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  background: rgb(28, 28, 30);
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
  margin:10px;
  display: flex;  
  flex-direction: column;
  align-items: center;
`

const RightContainer = styled.div`
  flex: 1;
  border-radius: 10px;
  margin: 10px;
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
  width: 100%;
  height: 100px;
  border-radius: 30px;
  padding: 5px;
  box-shadow: 10px 10px 10px rgba(12, 12, 10, 0.2);
  background: linear-gradient(43deg, #0e9777 0%, #b0ff00 46%, #52730a 100%);
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-evenly;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
`

const Main = styled.main`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  background: #2C2C2C;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  margin-top: 10px;
  box-shadow: 10px 10px 10px rgba(12, 12, 10, 0.2); 
`

const BoxRight = styled.div`
  padding: 5px;
  height: 100%;
  border-radius: 1rem;
  background-color: ;
  background-image: linear-gradient(43deg, #cdcdcd 0%, #bfc1c1b3 46%, #8f8f8f 100%);
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;

  overflow: auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0px; 
  }
  &::-webkit-scrollbar-thumb {
    background-color: #bfc1c1b3;
    border-radius: 10px;
  }
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

const Extrato =  styled.div`
`
const CarteiraContent: React.FC = () =>{
    return(
        <Container>
        <LeftContainer>
          <Top>
            <Box>
              <Title>
                Saldo
              </Title>                        
            </Box>
          </Top>
  
          <Main>
            <h1>Carteira gráfico</h1>
            <Extrato>
            <ul>
            <li>seila</li>
            <li>seila</li>
            <li>seila</li>
            <li>seila</li>
            <li>seila</li>
            <li>seila</li>
            <li>seila</li>

            </ul>
            </Extrato>
            
            
          </Main>
        </LeftContainer>
  
        <RightContainer>
          <BoxRight>
            <Title>
              Ações
            </Title>
            
          </BoxRight>
          
        </RightContainer>
      </Container>
    )
}

export default CarteiraContent