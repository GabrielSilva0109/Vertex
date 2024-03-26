import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const HeaderStyle = styled.div`
    background: black;
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

const Nav = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`

const Icon = styled.h1`
    color: #b0ff00;
    margin-right: 8px;
`

const NavLinks = styled.div`
    color: white;
    font-size: 1.2rem;
    font-weight: 600;

    @media (max-width: 768px) {
        display: none;
    }
`

const UlLinks = styled.ul`
    display: flex;
    gap: 50px;
    list-style: none;

    @media (max-width: 768px) {
        display: none;
    }
`

const Links = styled(Link)`
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
    text-decoration: none
`

const BtnLogin = styled(Link)`
    background: #b0ff00;
    padding: 12px;
    border-radius: 20px;
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

const Header: React.FC = () => {
    return (
        <HeaderStyle>
            <TitleBank>
                <Icon>$</Icon>                
                <h1>Vertex Bank</h1>
            </TitleBank>

            <Nav>
                <NavLinks>
                    <UlLinks>
                        <Links to="/">Inicio</Links>
                        <li>Sobre</li>
                        <li>Beneficios</li>
                        <li>Contato</li>
                    </UlLinks>
                </NavLinks>
                <BtnLogin  to="/login" >Login</BtnLogin>
            </Nav>
        </HeaderStyle>
    )
}

export default Header
