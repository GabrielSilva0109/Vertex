import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    height: 555px;
    width: 100%;
    background:black;
    display: flex;
    justify-content:center;
    align-items: center;
    color: white;
`

const Box = styled.div`
    width: 350px;
    height: 400px;
    background: gray;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 10px;
    gap:10px;
    margin: 10px;
`

const Input = styled.input`
    background-color: #e1e1e1;
    color: black;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 16px;
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid #b0ff00;
    outline: none;
    transition: all 0.3s ease-in-out;

    &:hover {
    background-color: #f1f1f1;
    border-color: #667788;
    }

    &:focus {
    background-color: #272727;
    border-color: #b0ff00;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }

    &.invalid {
    border-color: #ff0000;
    background-color: #f00;
    }

    /* Animações */
    &.entering {
    animation: slide-in 0.3s ease-in-out forwards;
    }
`

const BtnLogin = styled.button`
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

`

const BtnCadastro = styled.button`
    background: white;
    padding: 12px;
    border-radius: 20px;
    color: black;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        background: #dfdfdf;
    }

`

const FormLogin: React.FC = () => {
    return (
        <Container>
            <Box>
                <h1>Login</h1>
                <Input placeholder='CPF' type="text" />
                <Input placeholder='Senha' type="password"  />
                <BtnLogin>Login</BtnLogin>
                <BtnCadastro>Cadastrar</BtnCadastro>
            </Box>
        </Container>
    )
}


export default FormLogin