import React, { useEffect, useState } from 'react'
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

const Info = styled.div`
    display: flex;
    justify-content: start;
    align-items: start;
    width: 100%;


`
const ModalEdit: React.FC<ModalProps> = ({ onClose, walletId, onSubmit, fetchInvestimentos, investimento }) => {
    const [valor, setValor] = useState('')
    const [quantidade, setQuantidade] = useState('')

    useEffect(() => {
       
    }, [investimento])
    
    const handleSubmit = () => {
        const requestData = {
            valor: valor,
            quantidade: quantidade,
        };
        onSubmit(requestData)
    }
    
    return (
        <ModalOverlay>
            <ModalContent>
                <Form>
                    <h1>Atualizar</h1>
                    <Info style={{display: 'flex', justifyContent: 'start'}}>
                        <label>Valor: {investimento?.valor}</label>
                    </Info>
                    
                    <Input type="number" placeholder="Valor" value={valor} onChange={(e) => setValor(e.target.value)} />
                    
                    <Info>
                        <label>Quantidade: {investimento?.quantidade}</label>
                    </Info>
                    
                    <Input type="number" placeholder="Quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
                    
                    <BtnAtivo onClick={handleSubmit} type="submit">Atualizar</BtnAtivo>
                    <BtnDespesa onClick={onClose}>Fechar</BtnDespesa>
                </Form>
            </ModalContent>
        </ModalOverlay>
    )
}

export default ModalEdit