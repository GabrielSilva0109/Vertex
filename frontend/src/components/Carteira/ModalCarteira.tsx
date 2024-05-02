import React from 'react'
import styled from 'styled-components'
import { BtnAtivo, BtnDespesa } from './CarteiraContent'
import { Input } from '../Login/FormLogin'

interface ModalProps {
  isOpen: boolean;
  isDespesa: boolean;
  onCheckboxChange: () => void;
  onClose: () => void;
  onSubmit: () => void;
  formData: {
    wallet_id: string;
    titulo: string;
    valor: string;
    observacao: string;
    categoria: string;
    fonte: string;
    data: string;
  }
  setFormData: React.Dispatch<React.SetStateAction<{
    wallet_id: string;
    titulo: string;
    valor: string;
    observacao: string;
    categoria: string;
    fonte: string;
    data: string;
  }>>
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

export const ModalContent = styled.div`
  background: #515151;
  padding: 20px;
  border-radius: 10px;
`

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
`

const CheckboxLabel = styled.label`
  position: relative;
  display: inline-block;
`;

const CustomCheckbox = styled.input`
  display: none;
`;

const CheckboxText = styled.span<{ isDespesa: boolean }>`
  padding: 6px 20px;
  background-color: ${props => (props.isDespesa ? '#ff5b5b' : '#b0ff00')};
  border-radius: 5px;
  font-weight: bold;
  color: black;
`;

const Toggle = styled.span`
  width: 100px;
  height: 50px;
  position: absolute;
  border-radius: 30px;
  left: 5px;
  cursor: pointer;
  background: linear-gradient(40deg, #FF0080,#FF8C00 70%);
  transition: 0.4s;
  box-shadow: 0px 0px 3px rgb(255, 255, 20), 0px 0px 5px rgb(255, 255, 20);
`;

const Slide = styled.label`
  width: 230px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
`;

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, formData, setFormData, isDespesa, onCheckboxChange }) => {
  return (
    <ModalContainer style={{ display: isOpen ? 'flex' : 'none' }}>
      <ModalContent>
        <Form>
            <CheckboxLabel>
              <CustomCheckbox
                type="checkbox"
                id="inpLock"
                checked={isDespesa}
                onChange={onCheckboxChange}
                />
              <CheckboxText isDespesa={isDespesa}>{isDespesa ? 'Despesa' : 'Ativo'}</CheckboxText>
            </CheckboxLabel>
          
          <Input
            type="text"
            placeholder="Título"
            value={formData.titulo}
            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
          />
          <Input
            type="number"
            step="0.01"
            placeholder="Valor"
            value={formData.valor}
            onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
            onBlur={(e) => {
              const formattedValue = parseFloat(e.target.value).toFixed(2);
              setFormData({ ...formData, valor: formattedValue });
            }}
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
  )
}

export default Modal