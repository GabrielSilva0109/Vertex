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

const CarteiraContent: React.FC = () =>{
    return(
        <Container>
            <LeftContainer>

            </LeftContainer>
            <RightContainer>

            </RightContainer>
        </Container>
    )
}

export default CarteiraContent