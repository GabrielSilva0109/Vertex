import React from "react";
import styled from "styled-components";
import grafico from '../Sections/img/graficos.jpg';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: stretch;
    background: #1c1c1e;
`;

const Left = styled.div`
    flex: 1;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    margin-left: 30px;
    overflow: hidden; 
`

const Img = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${grafico});
`

const Right = styled.div`
    flex: 1; 
    background: black;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 350px;
    margin-right: 30px;
`

const Top = styled.div`
    color: white;
    margin-bottom: 20px;
`

const BtnLogin = styled.button`
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;
`;

const Grafico: React.FC = () => {
    return (
       <Container>
        <Left>
            <Img />
        </Left>
        <Right>
            <Top>
                <p>Graficos --- 2024</p>
            </Top>
            <BtnLogin>Button</BtnLogin>
        </Right>
       </Container> 
    )
}

export default Grafico
