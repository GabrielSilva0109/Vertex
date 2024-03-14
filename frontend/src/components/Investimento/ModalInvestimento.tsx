import React from 'react';
import styled from 'styled-components';
import { Form, ModalContent } from '../Carteira/ModalCarteira';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: black;
  border: none;
  cursor: pointer;
`

interface ModalProps {
  onClose: () => void;
  children?: React.ReactNode; // Definindo children como opcional
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <ModalOverlay>
      <ModalContent>
          <Form>
            <h1>Seila</h1>
            <button onClick={onClose}>X</button>
          </Form>
      </ModalContent>
      
    </ModalOverlay>
  );
};

export default Modal;
