import React from "react"
import styled from "styled-components"
import grafico from '../Sections/img/graficos.jpg'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1c1c1e;
    
`

const Img = styled.img`
    width: 100%;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    max-height: 300px;
`

const Left = styled.div`
    width: 55.5%;
    background: url
`

const Right = styled.div`
    width: 40%;
    background: black;
    height: 302px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
`

const Top = styled.div``

const Title = styled.div``

const Text = styled.div``

const BtnLogin = styled.button``

const Grafico: React.FC = () => {
    return(
       <Container>
        <Left>
            
        </Left>
        <Right>
            <Top>
                <p>Graficos  --- 2024</p>
            </Top>
            <Title>

            </Title>
            <Text>

            </Text>
            <BtnLogin>

            </BtnLogin>
        </Right>
            
       </Container> 
    )
}
    

export default Grafico