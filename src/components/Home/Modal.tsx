import React from 'react'
import styled from 'styled-components'

interface ModalProps {
    isOpen: boolean
    onClose: () => void;
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

export const ModalContent = styled.div`
  background: #515151;
  padding: 20px;
  border-radius: 10px;
`

const Modal : React.FC = () => {
     return (
        <>
        </>
     )
}

export default Modal