import React from 'react'
import styled from 'styled-components'
import { BtnAtivo, BtnDespesa } from './CarteiraContent'
import { Input } from '../Login/FormLogin'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    formData: {
      wallet_id: string;
      titulo: string;
      valor: string;
      observacao: string;
      categoria: string;
      fonte: string
    };
    setFormData: React.Dispatch<React.SetStateAction<{
      wallet_id: string;
      titulo: string;
      valor: string;
      observacao: string;
      categoria: string;
      fonte: string;
    }>>;
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
  `
  
  const ModalContent = styled.div`
    background: #515151;
    padding: 20px;
    border-radius: 10px;
  `

  const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `

  const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, formData, setFormData }) => {
    return (
      <ModalContainer style={{ display: isOpen ? "flex" : "none" }}>
        <ModalContent>
          <Form>
            <Input
                 type="text"
                placeholder="Título"
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
            />
            <Input 
                type="text"
                placeholder="Valor"
                value={formData.valor}
                onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
            />
            <Input 
                type="text"
                placeholder="Observação"
                value={formData.observacao}
                onChange={(e) => setFormData({ ...formData, observacao: e.target.value })}
            />
            <Input 
                type="text"
                placeholder="categoria"
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
            />
            <Input 
                type="text"
                placeholder="fonte"
                value={formData.fonte}
                onChange={(e) => setFormData({ ...formData, fonte: e.target.value })}
            />            
            <BtnAtivo onClick={onSubmit}>Adicionar</BtnAtivo>
            <BtnDespesa onClick={onClose}>Fechar</BtnDespesa>
          </Form>
        </ModalContent>
      </ModalContainer>
    );
  };
  
  export default Modal;