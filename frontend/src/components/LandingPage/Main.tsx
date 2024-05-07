import React from 'react';
import styled from 'styled-components';
import vertex from '../Sections/img/vertex.png';

const Container = styled.div`
    display: flex;
    background: black;
    color: white;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap; 
    padding: 20px; 
`

const LeftContainer = styled.div`
    flex: 1;
    max-width: 600px; 
    padding: 20px;
`

const TitleMain = styled.h1`
    font-size: 2.8rem;
    text-align: start;

    @media (max-width: 768px) {
       font-size: 1.8rem;
    }
`

const TextMain = styled.p`
    font-size: 1.2rem;
    text-align: start;
    color: gray;
    font-weight: 600;

    span {
        transition: color 0.3s ease;

        &:hover {
            color: #b0ff00; 
        }
    }

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`

const RightContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Image = styled.img`
    width: 100%;
    height: auto;
    max-width: 500px; /* Define uma largura máxima para a imagem */
`

const Main: React.FC = () => {
    return (
        <Container>
            <LeftContainer>
                <TitleMain>Seu universo financeiro<br /> em um só lugar</TitleMain>
                <TextMain><span>Ações</span>, <span>Criptomoedas</span>, <span>ETFs</span>, <span>Renda fixa </span>
                     e muito mais.<br /> Diversifique seu portfólio, maximize seus retornos e <br />
                    acompanhe tudo em tempo real com nossa plataforma.</TextMain>
            </LeftContainer>
            <RightContainer>
                <Image src={vertex} />
            </RightContainer>
        </Container>
    );
};

export default Main;
