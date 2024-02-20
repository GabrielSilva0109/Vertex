import React from 'react'
import styled from 'styled-components'

const HeaderStyle = styled.div`
    background: black;
    display: flex;
    justify-content: space-between;
    padding: 0px 20px;
`

const TitleBank = styled.div`
    color: white;
`

const NavLinks = styled.div`
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
    display: flex;
    justify-content: center;
`
const UlLinks = styled.ul`
    display: flex;
    align-items: center;
    gap: 30px;
    list-style: none;
    cursor: pointer;
`

const BtnLogin = styled.button`
    background: #b0ff00;
    padding: 12px 18px;
    border-radius: 20px;
    color: black;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    cursor: pointer;
    &:hover{
        background: #d3fd74;
    }
`

const Header: React.FC = () =>{
    return (
        <HeaderStyle>
            <TitleBank>
                <h1>Vertex Bank</h1>
            </TitleBank>
            <NavLinks>
                <UlLinks>
                    <li>Inicio</li>
                    <li>Sobre</li>
                    <li>Beneficios</li>
                    <li>Contato</li>
                    <li><BtnLogin className='btn-login'>Login</BtnLogin></li>
                </UlLinks>               
            </NavLinks>
        </HeaderStyle>
    )
}

export default Header