import React from 'react'
import styled from 'styled-components'

const HeaderStyle = styled.div`
    background: black;
    display: flex;
`

const TitleBank = styled.div`
    color: white;
`

const Header: React.FC = () =>{
    return (
        <HeaderStyle className='header'>
            <TitleBank className='title-header'>
                <h1>Vertex Bank</h1>
            </TitleBank>
            <div className='nav-links'>
                <ul>
                    <li>Inicio</li>
                    <li>Sobre</li>
                    <li>Beneficios</li>
                    <li>Contato</li>
                </ul>
                <button className='btn-login'>Login</button>
            </div>
        </HeaderStyle>
    )
}

export default Header