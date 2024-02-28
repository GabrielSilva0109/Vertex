import React, { ChangeEvent, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  background: rgb(28, 28, 30);
  width: 100%;
  height: 100vh;
  color: white;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const LeftContainer = styled.div`
  flex: 3; 
  border-radius: 10px;
  margin:10px;
  display: flex;  
  flex-direction: column;
  align-items: center;
`

const RightContainer = styled.div`
  flex: 1;
  border-radius: 10px;
  margin: 10px;
  gap: 10px;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  background: #2C2C2C;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  box-shadow: 10px 10px 10px rgba(12, 12, 10, 0.2); 
`

const Btn = styled.button`
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

const BoxRight = styled.div`
  height: 50%;
  border-radius: 1rem;
  background-image: linear-gradient(43deg, #cdcdcd 0%, #bfc1c1b3 46%, #8f8f8f 100%);
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  overflow: auto;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0px; 
  }
  &::-webkit-scrollbar-thumb {
    background-color: #bfc1c1b3;
    border-radius: 10px;
  }
`

const Title = styled.h1`
  color: white;
  font-size: 1.5rem;
  padding: 0px;
  margin:10px;
  display: flex;
  align-items: center;
  justify-content: start;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const Extrato =  styled.div`
`

const ImgPerfil = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: white;
  transition: 0.8s;
  margin-top: 15px;
  &:hover{
    background: #d9d9d9;
  }
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

const Form = styled.div`
    display:flex;
    flex-direction: column;
    gap: 10px;
`
const CarteiraContent: React.FC = () =>{
    const { state } = useLocation()
    const user = state?.user    
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
      name: '',
      valor: '',
      descricao: ''
  })

    const adicionarTransacao = async () => {
      try{
        const response = await fetch('http://localhost:3333/ativo', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
      })

      } catch (erro) {
        console.log("Erro ao Adicionar Transação")
      }
    }

    return(
        <Container>
        <LeftContainer>  
          <Main>
            <h1>Extrato</h1>
            <Extrato>
            
            </Extrato>
            
            
          </Main>
        </LeftContainer>
  
        <RightContainer>
          <BoxRight>
          <ImgPerfil></ImgPerfil>
            <h4>
                {user.name}
            </h4>

            <p>{user.email}</p>
            <p>{user.cpf}</p>
            
          </BoxRight>
          <BoxRight>
            <Title>Transação</Title>
            <Form>
              <Input placeholder="Titulo"/>
              <Input placeholder="Valor"/>
              <Input placeholder="Descrição"/>
              <Btn>Adicionar</Btn>
            </Form>
            
          </BoxRight>
        </RightContainer>
      </Container>
    )
}

export default CarteiraContent