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
