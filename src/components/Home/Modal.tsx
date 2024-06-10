import React, { useEffect } from 'react'
import styled from 'styled-components'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    cryptoName: string
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`

const ModalContent = styled.div`
  background: #515151;
  padding: 20px;
  border-radius: 10px;
`

const BtnClose = styled.button`
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: red;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;

    &:hover{
    background:#a30000;
    }
`

const Title = styled.h1`

`

const SubTitle = styled.h1`

`

const Price = styled.h1`

`

const Variation = styled.h1`

`


const Modal: React.FC<ModalProps> = ({ isOpen, onClose, cryptoName }) => {
    useEffect(() => {
        if (isOpen) {
          // Faça a requisição para a API aqui usando o cryptoName
          fetch(`https://api.coingecko.com/api/v3/coins/${cryptoName}`)
            .then(response => response.json())
            .then(data => {
              console.log(data); // Faça algo com os dados recebidos
            })
            .catch(error => console.error('Erro ao buscar dados da criptomoeda:', error));
        }
    }, [isOpen, cryptoName])
    
    if (!isOpen) return null

     return (
        <>
        <ModalContainer>
            <ModalContent>
                <Title>

                </Title>
                <SubTitle>

                </SubTitle>
                
                <Price>

                </Price>

                <Variation></Variation>

                <BtnClose onClick={onClose}>x</BtnClose>
            </ModalContent>
        </ModalContainer>
        </>
     )
}

export default Modal