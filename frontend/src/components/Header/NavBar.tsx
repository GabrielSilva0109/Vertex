import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Nav = styled.div`
    background: rgb(28, 28, 30);
    display: flex;
    justify-content: space-between;
    padding: 0px 20px;
    align-items: center;

    @media (max-width: 768px) {
        align-items: center;
        text-align: center;
    }
`

const TitleBank = styled.div`
    display: flex;
    align-items: center;
    color: white;
`

const Icon = styled.h1`
    color: #b0ff00;
    margin-right: 8px;
`

const Links = styled.div`

`

const UlLinks = styled.ul`
    display: flex;
    gap: 50px;
    list-style: none;

    @media (max-width: 768px) {
        display: none;
    }
`

const Navigation = styled(Link)`
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
    text-decoration: none
`

const Config = styled.div`

`

const BtnSair = styled(Link)`
    background: gray;
    padding: 8px;
    border-radius: 50%;
    color: black;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    cursor: pointer;
    text-decoration: none;


    &:hover {
        background: #d3fd74;
    }

    @media (max-width: 768px) {
        display: block;
    }
`

const NavBar: React.FC = () => {
    return (
        <Nav>
            <TitleBank>
                <Icon>$</Icon>                
                <h1>Vertex Bank</h1>
            </TitleBank>

            <Links>
                <UlLinks>
                    <Navigation to="/home">Home</Navigation>
                    <Navigation to="">Carteira</Navigation>
                    <Navigation to="">Gastos</Navigation>
                    <Navigation to="">Noticias</Navigation>

                </UlLinks>
            </Links>

            <Config>
                <BtnSair to="/login">Sair</BtnSair>

            </Config>
        </Nav>
    )
}

export default NavBar