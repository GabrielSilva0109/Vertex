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
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 45px;
    height: 45px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition-duration: 0.3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
    background-color: #b0ff00;
    text-decoration: none;
    
    
`

const Sign = styled.div`
    width: 100%;
    transition-duration: 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    
    svg {
        width: 18px;
        
    }

    svg path {
        fill: black;
    }
`


const NavBar: React.FC<{user?: any}> = ({user}) => {
    return (
        <Nav>
            <TitleBank>
                <Icon>$</Icon>                
                <h1>Vertex Bank</h1>
            </TitleBank>

            <Links>
                <UlLinks>
                    <Navigation to={`/home`} {...(user ? { state: { user } } : {})}>
                        Home
                    </Navigation>
                    <Navigation to={`/carteira`} {...(user ? { state: { user } } : {})}>
                        Carteira
                    </Navigation>
                    <Navigation to={`/Investimentos`} {...(user ? { state: { user } } : {})}>
                        Investimentos
                    </Navigation>
                    <Navigation to={`/noticias`} {...(user ? { state: { user } } : {})}>
                        Noticias
                    </Navigation>
                </UlLinks>
            </Links>

            <Config>
                <BtnSair to="/login">
                    <Sign>
                        <svg viewBox="0 0 512 512">
                        <path
                            d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                        ></path>
                        </svg>
                    </Sign>
                </BtnSair>
            </Config>
        </Nav>
    )
}

export default NavBar