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
  z-index: 1;
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
  display: flex;
  width: 100%;
  border-radius: 50px;
  height: 40px;
  background: #393939;
  align-items: center;
`

const CustomCheckbox = styled.input`
  display: none;
`

const CheckboxText = styled.span<{ isDespesa: boolean }>`
  padding: 6px 20px;
  background-color: ${props => (props.isDespesa ? '#ff5b5b' : '#b0ff00')};
  border-radius: 5px;
  font-weight: bold;
  color: black;
`

const Toggle = styled.span<{ isDespesa: boolean }>`
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  position: absolute;
  border-radius: 50px;
  cursor: pointer;
  background: ${props => (props.isDespesa ? 'red' : '#b0ff00')};
  transition: left 0.4s, background 0.4s;
`

const Slide = styled.label`
  width: 40px; 
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`


const Select = styled.select`
  max-width: 229px;
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
            <Toggle isDespesa={isDespesa} style={{ left: isDespesa ? 'calc(100% - 104px)' : '5px' }}>{isDespesa ? 'Despesa' : 'Ativo'}</Toggle> 
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
          <Select id="observacao" value={formData.observacao} onChange={(e) => setFormData({ ...formData, observacao: e.target.value })}>
            <option value="">Selecione a Categoria&nbsp;&nbsp;&nbsp;&nbsp;</option>
            <option value="Salario">Salario</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Transporte">Transporte</option>
            <option value="Lazer">Lazer</option>
            <option value="Investimentos">Investimentos</option>
            <option value="Vestuario">Vestuario</option>
          </Select>
          
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