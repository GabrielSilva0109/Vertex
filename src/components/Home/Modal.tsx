import React from 'react'
import styled from 'styled-components'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
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
    width: 10px;
    height: 10px;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: red;
    color: white;
`

const Title = styled.h1`

`

const SubTitle = styled.h1`

`

const Price = styled.h1`

`

const Variation = styled.h1`

`


const Modal : React.FC<ModalProps> = ({ isOpen, onClose}) => {
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