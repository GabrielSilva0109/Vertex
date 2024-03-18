import React, { useState } from 'react'
import styled from 'styled-components'
import { Form, ModalContent } from '../Carteira/ModalCarteira'
import { BtnAtivo, BtnDespesa } from '../Carteira/CarteiraContent'
import { Input } from '../Login/FormLogin'

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
  onClose: () => void
  children?: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ onClose, children}) => {

  const [titulo, setTitulo] = useState('')
  const [valor, setValor] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [categoria, setCategoria] = useState('')
  const [data, setData] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    // Criar um objeto com os dados da requisição
    const requestData = {
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
      });
  
      if (!response.ok) {
        throw new Error('Erro ao adicionar ativo');
      }
      console.log('Ativo adicionado com sucesso');
      onClose(); // Fechar o modal após o sucesso do envio
    } catch (error) {
      console.error('Erro ao adicionar ativo:', error)
    }
  }
  
  return (
    <ModalOverlay>
      <ModalContent>
          <Form>
            <h1>Investimento</h1>
            <Input type='text' placeholder='Ativo' value={titulo} onChange={(e) => setTitulo(e.target.value)} />
            <Input type='number' placeholder='Valor' value={valor} onChange={(e) => setValor(e.target.value)} />
            <Input type='number' placeholder='Quantidade' value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
            <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              <option value="">Selecione uma categoria</option>
              <option value="Ação">Ações</option>
              <option value="Crypto">Crypto</option>
              <option value="Moeda">Moeda</option>
              <option value="FIIs">FIIs</option>
              <option value="Renda Fixa">Renda Fixa</option>
              <option value="Poupança">Poupança</option>
            </select>
            <Input type='date' placeholder='Data' value={data} onChange={(e) => setData(e.target.value)} />
            <BtnAtivo onClick={handleSubmit} type="submit">Adicionar</BtnAtivo>
            <BtnDespesa onClick={onClose}>Fechar</BtnDespesa>
          </Form>
      </ModalContent>
      
    </ModalOverlay>
  );
};

export default Modal;
