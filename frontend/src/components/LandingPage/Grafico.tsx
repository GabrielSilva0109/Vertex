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
`

const Left = styled.div`
width: 800px;

`

const Right = styled.div`

`
const Grafico: React.FC = () => {
    return(
       <Container>
        <Left>
        <Img src={grafico}/>
        </Left>
        <Right>

        </Right>
            
       </Container> 
    )
}
    

export default Grafico