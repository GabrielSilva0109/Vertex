import React from 'react'
import styled from 'styled-components'
import { Form } from '../Carteira/ModalCarteira'
import { BtnAtivo, BtnDespesa } from '../Carteira/CarteiraContent'
import { Input } from '../Login/FormLogin'
import { toast } from 'react-toastify'

interface ModalProps {
    onClose: () => void
    walletId: number
    investimento?: any
    onSubmit: (requestData: any) => void
    fetchInvestimentos: () => void
    children?: React.ReactNode
}

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
`

const ModalContent = styled.div`
  background-color: gray;
  padding: 20px;
  border-radius: 10px;
`

const Select = styled.select`
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

const Option = styled.option`
  background-color: #f1f1f1;
  color: black;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 16px;
`

const ModalEdit: React.FC<ModalProps> = ({onClose, walletId, onSubmit}) => {
    return (
        <div></div>
    )
}

export default ModalEdit