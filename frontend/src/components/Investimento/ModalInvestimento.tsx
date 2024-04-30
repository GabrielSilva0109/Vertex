import React, { useState } from 'react'
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

const Option = styled.option`
  background-color: #f1f1f1;
  color: black;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 16px;
`

const ModalInvestimento: React.FC<ModalProps> = ({ onClose, walletId, onSubmit, fetchInvestimentos }) => {
  const [titulo, setTitulo] = useState('');
  const [valor, setValor] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [categoria, setCategoria] = useState('');
  const [data, setData] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    const requestData = {
      wallet_id: walletId, 
      titulo,
      valor,
      quantidade,
      categoria,
      data,
    }
  
    // Imprimir a requisição no console.log
    console.log('Requisição:', requestData)
  
    try {
      const response = await fetch('http://localhost:3333/investimento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData), 
      })
  
      if (!response.ok) {
        throw new Error('Erro ao adicionar ativo')
      } else {
        toast.success('Ativo Cadastrado!')
        onSubmit(requestData)
      }
    } catch (error) {
      console.error('Erro ao adicionar ativo:', error)
    }
  }
  
  return (
    <ModalOverlay>
      <ModalContent>
        <Form>
          <h1>Investimento</h1>
          <Input required={true} type='text' placeholder='Ativo' value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          <Input required={true} type='number' placeholder='Valor' value={valor} onChange={(e) => setValor(e.target.value)} />
          <Input required={true} type='number' placeholder='Quantidade' value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
          <Select required={true} id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="">Selecione uma categoria</option>
            <option value="Ação">Ações</option>
            <option value="Crypto">Crypto</option>
            <option value="Moeda">Moeda</option>
            <option value="FIIs">FIIs</option>
            <option value="Renda Fixa">Renda Fixa</option>
            <option value="Poupança">Poupança</option>
          </Select>
          <Input required={true} style={{width: '85%'}} type='date' placeholder='Data' value={data} onChange={(e) => setData(e.target.value)} />
          <BtnAtivo onClick={handleSubmit} type="submit">Adicionar</BtnAtivo>
          <BtnDespesa onClick={onClose}>Fechar</BtnDespesa>
        </Form>
      </ModalContent>
    </ModalOverlay>
  )
}

export default ModalInvestimento
