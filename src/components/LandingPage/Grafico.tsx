import React from "react"
import styled from "styled-components"
import grafico from '../../IMG/graficos.jpg'
import { Link } from 'react-router-dom'

const Container = styled.div`
    display: flex;
    justify-content: center;
    background: #1c1c1e;
    align-items: center;
    height: 400px;

    @media (max-width: 768px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: auto;
        margin-top: -5px;
    }
`

const Left = styled.div`
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    margin-left: 30px;
    width: 50%;
    height: 340px;

    @media (max-width: 768px) {
        margin: 0px 0 20px;
        border-radius: 20px;
        border: none;
        width: 93%;
    }
    
`

const Img = styled.img`
    width: 100%;
    height: 340px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;

    @media (max-width: 768px) {
        border-radius: 10px;
    }
`

const Right = styled.div`
    background: black;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    height: 340px;
    width: 50%;
    margin-right:30px;

    @media (max-width: 768px) {
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        border-top-right-radius: 0px;
        border: none;
        width: 93%;
        height: auto;
        margin-top: -39px;
        margin-left: 30px;
    }
`

const Top = styled.div`
    color: gray;
    margin-left: 20px;
    margin-bottom: -10px;

    @media (max-width: 768px) {
        margin-top:20px;
    }
`

const Title = styled.h1`
    font-size: 1.7rem;
    color: white;
    margin-left: 20px;
    text-align: left; 
`

const Text = styled.div`
    color: gray;
    margin-left: 20px;
    margin-right:30px;
    text-align: left;
    font-weight: bold;
    line-height: 1.5; 
`

const BtnLogin = styled(Link)`
    background-color: #b0ff00;
    border: none;
    color: black;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    font-weight: bold;
    margin-top: 10px;
    margin-left: 20px;
    cursor: pointer;
    border-radius: 10px;

    @media (max-width: 768px) {
        margin-left: 20px;
        margin-bottom: 10px;
    }
`

const Grafico: React.FC = () => {
    return (
       <Container>
        <Left>
            <Img src={grafico} />
        </Left>
        <Right>
            <Top>
                <p>Recharts | 2024</p>
            </Top>
            <Title>Maximize a Experiência com Gráficos de Elite</Title>
            <Text>
            Desvende novas perspectivas com os gráficos de elite da nossa plataforma. Com uma variedade de opções visuais e recursos personalizáveis, nossa ferramenta oferece uma experiência de visualização de dados excepcional. Transforme insights em ações concretas e impulsione seu projeto para o próximo nível com nossos gráficos de ponta.
            </Text>
            <BtnLogin to="/login">Cadastrar</BtnLogin>
        </Right>
       </Container> 
    )
}

export default Grafico
