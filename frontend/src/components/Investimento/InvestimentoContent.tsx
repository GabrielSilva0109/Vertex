import React, { useEffect, useState } from 'react'
import { BoxRight, LeftContainer, RightContainer } from '../Carteira/CarteiraContent'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import CircleGrafico from '../Graficos/CircleGrafico'
import ModalInvestimento from './ModalInvestimento'
import ModalEdit from './ModalEdit'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { error } from 'console'

export const MiniBox = styled.div`
  background: black;
  width: 90%;
  padding: 5px;
  border-radius: 15px;
`

export const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Container = styled.div`
  display: flex;
  background: rgb(28, 28, 30);
  width: 100%;
  min-height: 100vh;
  color: white;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const Main = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #2c2c2c;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  box-shadow: 10px 10px 10px rgba(12, 12, 10, 0.2);
`

const ExpandedBox = styled.div<{ isOpen: boolean }>`
  background: gray;
  width: 95%;
  padding: 5px;
  border-radius: 15px;
  margin-top: 15px;
  height: ${(props) => (props.isOpen ? '400px' : '65px')};
  min-height: 65px;
  overflow: ${(props) => (props.isOpen ? 'auto' : 'hidden')}; 
  max-height: 400px; // Define a altura máxima como 400px
  transition: height 0.3s;
  display: block;
  align-items: start;
  &::-webkit-scrollbar {
    width: 0px;
  }

  scrollbar-width: none;

`

const BtnOpen = styled.button<{ isOpen: boolean }>`
  background-color: ${(props) => (props.isOpen ? 'rgb(60, 60, 60)' : 'rgb(46, 46, 46)')};
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  border: none;
  width: 30px;
  height: 30px;
  &:hover {
    background-color: ${(props) => (props.isOpen ? 'rgb(60, 60, 60)' : 'rgb(75, 75, 75)')};
  }

  &:active {
    background-color: ${(props) => (props.isOpen ? 'rgb(60, 60, 60)' : 'black')};
  }
`

const Top = styled.div<{ isOpen: boolean; color: string }>`
  display: flex;
  align-items: ${(props) => (props.isOpen ? 'flex-start' : 'center')};
  justify-content: space-between;
  width: 100%;
  padding-right: 10px;
  margin-top: 10px;
`

const SubTitle = styled.h1<{ borderColor: string }>`
  color: white;
  border-left: 4px solid ${(props) => props.borderColor};
  padding-left: 10px;
  margin: 0px;
`

const BtnAtivo = styled.button`
  background: #b0ff00;
  width: 92%;
  height: 50px;
  padding: 5px;
  border-radius: 15px;
  color: black;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background: #d3fd74;
  }
`

const Investimento = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 0px 15px;
margin: 5px;
background-color: gray;
border-radius: 8px;
color: white;
font-weight: bold;
background:#bfc1c1;
color: black;
`

interface Investimento {
  id: number;
  categoria: string;
}

const Btns = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap:5px;
`

const BtnDelete = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 10px;
  background-color: rgb(255, 0, 0);
  cursor: pointer;
  border: none;
  transition-duration: 0.3s;

  &:hover {
    background-color: rgb(255, 95, 95);
  }

  &:active {
    transform: scale(0.9);
  }

  .bin-bottom {
    width: 12px;
  }

  .bin-top {
    width: 15px;
    transform-origin: right;
    transition-duration: 0.3s;
  }

  &:hover .bin-top {
    transform: rotate(45deg);
  }
`

const BtnEdit = styled.button`
width: 35px;
height: 35px;
border-radius: 10px;
border: none;
background-color: #2c2c2c;
display: flex;
align-items: center;
justify-content: center;
box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.123);
cursor: pointer;
position: relative;
overflow: hidden;
transition: all 0.3s;

&::before {
  content: "";
  width: 200%;
  height: 200%;
  background-color: rgb(102, 102, 141);
  position: absolute;
  z-index: 1;
  transform: scale(0);
  transition: all 0.3s;
  border-radius: 50%;
  filter: blur(10px);
}

&:hover::before {
  transform: scale(1);
}

&:hover {
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.336);
}

svg {
  height: 15px;
  fill: white;
  z-index: 3;
  transition: all 0.2s;
  transform-origin: bottom;
}

&:hover svg {
  transform: rotate(-15deg) translateX(5px);
}

&::after {
  content: "";
  width: 25px;
  height: 1.5px;
  position: absolute;
  bottom: 10px;
  left: -5px;
  background-color: white;
  border-radius: 2px;
  z-index: 2;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s ease-out;
}

&:hover::after {
  transform: scaleX(1);
  left: -7.5px;
  transform-origin: right;
}
`

const InvestimentoContent: React.FC = () => {
  const { state } = useLocation()
  const user = state?.user
  const userId = user.id
  const navigate = useNavigate()
  const [saldo, setSaldo] = useState<number>(0)
  const [wallet_id, setWallet_id] = useState<number>(0)
  const [totalInvestido, setTotalInvestido] = useState<number>(0)
  const [investimentoAdicionado, setInvestimentoAdicionado] = useState(false)
  const [investimentosAcoes, setInvestimentosAcoes] = useState<any[]>([])
  const [investimentosCryptomoedas, setInvestimentosCryptomoedas] = useState<any[]>([])
  const [investimentosMoedas, setInvestimentosMoedas] = useState<any[]>([])
  const [investimentosFiis, setInvestimentosFiis] = useState<any[]>([])
  const [investimentosRendaFixa, setInvestimentosRendaFixa] = useState<any[]>([])
  const [investimentosPoupanca, setInvestimentosPoupanca] = useState<any[]>([])
  const [investimentoSelecionado, setInvestimentoSelecionado] = useState<any>(null)
  
  const colors = ['#b0ff00', '#005954', '#338b85', '#ffcc00', '#9ce0db', '#4f46e5']
  const [expandedBoxes, setExpandedBoxes] = useState<{ [key: string]: boolean }>({
    acoes: false,
    cryptomoedas: false,
    moedas: false,
    fundosImobiliarios: false,
    rendaFixa: false,
    poupanca: false,
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [modalOpenEdit, setModalOpenEdit] = useState(false)

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const openModalEdit = (investimento: any) => {
    setInvestimentoSelecionado(investimento)
    setModalOpenEdit(true)
  }

  const closeModalEdit = () => {
    setModalOpenEdit(false);
  }

  const toggleExpandedBox = (boxKey: string) => {
    setExpandedBoxes((prevBoxes) => ({
      ...prevBoxes,
      [boxKey]: !prevBoxes[boxKey],
    }))
  }

  const fetchSaldo = async (userId: number) => {
    try {
      const response = await fetch(`http://localhost:3333/walletUser/${userId}`);

      if (!response.ok) {
        console.error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        return;
      }

      const data = await response.json();

      if (data && data.saldo !== undefined) {
        setSaldo(data.saldo)
        setWallet_id(data.id)
      } else {
        console.error(`Resposta inesperada do servidor: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      console.error("Erro ao buscar saldo:", error);
    }
  }

  const fetchInvestimentos = async (walletId: number) => {
    try {
      const response = await fetch(`http://localhost:3333/walletInvestimentos/${walletId}`)
      
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`)
      }
      
      const data = await response.json()
      let total = 0

      data.forEach((investimento: any) => {
        total += investimento.valor;
      })

      setTotalInvestido(total)
      
      // Atualizar os estados com os investimentos filtrados
      const investimentosAcoes = data.filter((investimento: Investimento) => investimento.categoria === 'Ação')
      const investimentosCryptomoedas = data.filter((investimento: Investimento) => investimento.categoria === 'Crypto')
      const investimentoMoedas = data.filter((investimento: Investimento) => investimento.categoria === 'Moeda')
      const investimentoFiis = data.filter((investimento: Investimento) => investimento.categoria === 'FIIs')
      const investimentoRendaFixa = data.filter((investimento: Investimento) => investimento.categoria === 'Renda Fixa')
      const investimentoPoupanca = data.filter((investimento: Investimento) => investimento.categoria === 'Poupança')

      // Adicione mais estados conforme necessário para outras categorias
      setInvestimentosAcoes(investimentosAcoes)
      setInvestimentosCryptomoedas(investimentosCryptomoedas)
      setInvestimentosMoedas(investimentoMoedas)
      setInvestimentosFiis(investimentoFiis)
      setInvestimentosRendaFixa(investimentoRendaFixa)
      setInvestimentosPoupanca(investimentoPoupanca)
      
      // Fechar o modal após a atualização dos investimentos
      closeModal()
    } catch (error) {
      console.error("Erro ao buscar os investimentos da carteira:", error)
    }
  }

  const deleteInvestimento = async (investimentoId: number) => {
    try {
      const response = await fetch(`http://localhost:3333/investimento/${investimentoId}`, {
        method: "DELETE"
      });
      const data = await response.json();
  
      if (!response.ok) {
        toast.error('Erro ao Deletar o Investimento!')
      } else {
        toast.success('Investimento Excluído!')
      }
      await fetchInvestimentos(wallet_id);
    } catch (error) {
      console.error("Erro ao excluir o investimento:", error)
    }
  }

  const editInvestimento = async (investimentoId: number, novosDados: any) => {
    try {
      const response = await fetch(`http://localhost:3333/investimento/${investimentoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novosDados)
      });
  
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        console.log('Atualização erro', response)
      }
  
      toast.success('Investimento atualizado com sucesso!')
  
      
      closeModalEdit()
  
      // Atualize a lista de investimentos após a atualização bem-sucedida
      await fetchInvestimentos(wallet_id);
    } catch (error) {
      console.error('Erro ao editar o investimento:', error);
    }
  }


  useEffect(() => {
    if (user && user.id) {
      fetchSaldo(user.id)
      fetchInvestimentos(wallet_id)
    }
  }, [user, wallet_id])

  useEffect(() => {
    if (investimentoAdicionado) {
      fetchInvestimentos(wallet_id)
      closeModal()
      setInvestimentoAdicionado(false)
    }
  }, [investimentoAdicionado, fetchInvestimentos, closeModal])

  return (
    <Container>
      <LeftContainer>
        <Main>
          <ExpandedBox isOpen={expandedBoxes.acoes}>
            <Top isOpen={expandedBoxes.acoes} color={colors[0]}>
              <SubTitle borderColor="#b0ff00">Ações</SubTitle>
              <BtnOpen isOpen={expandedBoxes.acoes} onClick={() => toggleExpandedBox('acoes')}>
                {expandedBoxes.acoes ? '-' : '+'}
              </BtnOpen>
            </Top>
            {expandedBoxes.acoes && (
              <div>
                {investimentosAcoes.map((investimento, index) => (
                  <Investimento key={index}>
                    <p>{investimento.titulo}</p>
                    <p>Quantidade: {investimento.quantidade}</p>
                    <p>Valor: R${investimento.valor}</p>

                    <Btns>
                    <BtnEdit onClick={() => openModalEdit(investimento)}>
                       <svg height="1em" viewBox="0 0 512 512">
                        <path
                          d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                        ></path>
                      </svg>
                    </BtnEdit>
                    {modalOpenEdit && (
                      <ModalEdit
                        onClose={closeModalEdit}
                        walletId={wallet_id}
                        onSubmit={(requestData: any) => {
                          setInvestimentoAdicionado(true);
                        } } fetchInvestimentos={function (): void {
                          throw new Error('Function not implemented.');
                        } }/>
                      )}
                    <BtnDelete onClick={() => deleteInvestimento(investimento.id)}>
                    <svg
                          className="bin-top"
                          viewBox="0 0 39 7"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <line y1="5" x2="39" y2="5" stroke="white" stroke-width="4"></line>
                          <line
                            x1="12"
                            y1="1.5"
                            x2="26.0357"
                            y2="1.5"
                            stroke="white"
                            stroke-width="3"
                          ></line>
                        </svg>
                        <svg
                          className="bin-bottom"
                          viewBox="0 0 33 39"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <mask id="path-1-inside-1_8_19" fill="white">
                            <path
                              d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                            ></path>
                          </mask>
                          <path
                            d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                            fill="white"
                            mask="url(#path-1-inside-1_8_19)"
                          ></path>
                          <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
                          <path d="M21 6V29" stroke="white" stroke-width="4"></path>
                        </svg>
                    </BtnDelete>
                    </Btns>                   
                  </Investimento>
                ))}
              </div>
            )}
          </ExpandedBox>

          <ExpandedBox isOpen={expandedBoxes.cryptomoedas}>
            <Top isOpen={expandedBoxes.cryptomoedas} color={colors[1]}>
              <SubTitle borderColor='#005954'>Cryptomoedas</SubTitle>
              <BtnOpen isOpen={expandedBoxes.cryptomoedas} onClick={() => toggleExpandedBox('cryptomoedas')}>
                {expandedBoxes.cryptomoedas ? '-' : '+'}
              </BtnOpen>
            </Top>
            {expandedBoxes.cryptomoedas && (
              <div>
                {investimentosCryptomoedas.map((investimento, index) => (
                  <Investimento key={index}>
                    <p>{investimento.titulo}</p>
                    <p>Quantidade: {investimento.quantidade}</p>
                    <p>Valor: R${investimento.valor}</p>
                    <Btns>
                    <BtnEdit onClick={openModalEdit} >
                      <svg height="1em" viewBox="0 0 512 512">
                        <path
                          d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                        ></path>
                      </svg>
                    </BtnEdit>
                    <BtnDelete onClick={() => deleteInvestimento(investimento.id)}>
                    <svg
                          className="bin-top"
                          viewBox="0 0 39 7"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <line y1="5" x2="39" y2="5" stroke="white" stroke-width="4"></line>
                          <line
                            x1="12"
                            y1="1.5"
                            x2="26.0357"
                            y2="1.5"
                            stroke="white"
                            stroke-width="3"
                          ></line>
                        </svg>
                        <svg
                          className="bin-bottom"
                          viewBox="0 0 33 39"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <mask id="path-1-inside-1_8_19" fill="white">
                            <path
                              d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                            ></path>
                          </mask>
                          <path
                            d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                            fill="white"
                            mask="url(#path-1-inside-1_8_19)"
                          ></path>
                          <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
                          <path d="M21 6V29" stroke="white" stroke-width="4"></path>
                        </svg>
                    </BtnDelete>
                    </Btns>        
                  </Investimento>
                ))}
              </div>
            )}
          </ExpandedBox>

          <ExpandedBox isOpen={expandedBoxes.moedas}>
              <Top isOpen={expandedBoxes.moedas} color={colors[2]}>
                <SubTitle borderColor="#0030bf">Moedas</SubTitle>
                <BtnOpen isOpen={expandedBoxes.moedas} onClick={() => toggleExpandedBox('moedas')}>
                  {expandedBoxes.moedas ? '-' : '+'}
                </BtnOpen>
              </Top>
              {expandedBoxes.moedas && (
                <div>
                  {investimentosMoedas.map((investimento, index) => (
                    <Investimento key={index}>
                    <p>{investimento.titulo}</p>
                    <p>Quantidade: {investimento.quantidade}</p>
                    <p>Valor: R${investimento.valor}</p>
                    <Btns>
                    <BtnEdit onClick={openModal} >
                      <svg height="1em" viewBox="0 0 512 512">
                        <path
                          d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                        ></path>
                      </svg>
                    </BtnEdit>
                    <BtnDelete onClick={() => deleteInvestimento(investimento.id)}>
                    <svg
                          className="bin-top"
                          viewBox="0 0 39 7"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <line y1="5" x2="39" y2="5" stroke="white" stroke-width="4"></line>
                          <line
                            x1="12"
                            y1="1.5"
                            x2="26.0357"
                            y2="1.5"
                            stroke="white"
                            stroke-width="3"
                          ></line>
                        </svg>
                        <svg
                          className="bin-bottom"
                          viewBox="0 0 33 39"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <mask id="path-1-inside-1_8_19" fill="white">
                            <path
                              d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                            ></path>
                          </mask>
                          <path
                            d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                            fill="white"
                            mask="url(#path-1-inside-1_8_19)"
                          ></path>
                          <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
                          <path d="M21 6V29" stroke="white" stroke-width="4"></path>
                        </svg>
                    </BtnDelete>
                    </Btns>        
                    </Investimento>
                  ))}
                </div>
              )}
          </ExpandedBox>

          <ExpandedBox isOpen={expandedBoxes.fundosImobiliarios}>
            <Top isOpen={expandedBoxes.fundosImobiliarios} color={colors[3]}>
                <SubTitle borderColor="#ffcc00">Fundos Imobiliários</SubTitle>
                <BtnOpen isOpen={expandedBoxes.fundosImobiliarios} onClick={() => toggleExpandedBox('fundosImobiliarios')}>
                  {expandedBoxes.fundosImobiliarios ? '-' : '+'}
                </BtnOpen>
            </Top>
            {expandedBoxes.fundosImobiliarios && (
              <div>
                {investimentosFiis.map((investimento, index) => (
                  <Investimento key={index}>
                    <p>{investimento.titulo}</p>
                    <p>Quantidade: {investimento.quantidade}</p>
                    <p>Valor: R${investimento.valor}</p>
                    <Btns>
                    <BtnEdit onClick={openModal} >
                      <svg height="1em" viewBox="0 0 512 512">
                        <path
                          d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                        ></path>
                      </svg>
                    </BtnEdit>
                    <BtnDelete onClick={() => deleteInvestimento(investimento.id)}>
                    <svg
                          className="bin-top"
                          viewBox="0 0 39 7"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <line y1="5" x2="39" y2="5" stroke="white" stroke-width="4"></line>
                          <line
                            x1="12"
                            y1="1.5"
                            x2="26.0357"
                            y2="1.5"
                            stroke="white"
                            stroke-width="3"
                          ></line>
                        </svg>
                        <svg
                          className="bin-bottom"
                          viewBox="0 0 33 39"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <mask id="path-1-inside-1_8_19" fill="white">
                            <path
                              d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                            ></path>
                          </mask>
                          <path
                            d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                            fill="white"
                            mask="url(#path-1-inside-1_8_19)"
                          ></path>
                          <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
                          <path d="M21 6V29" stroke="white" stroke-width="4"></path>
                        </svg>
                    </BtnDelete>
                    </Btns>          
                  </Investimento>
                  ))}
              </div>
            )}
          </ExpandedBox>

          <ExpandedBox isOpen={expandedBoxes.rendaFixa}>
            <Top isOpen={expandedBoxes.rendaFixa} color={colors[4]}>
                <SubTitle borderColor="#9ce0db">Renda Fixa</SubTitle>
                <BtnOpen isOpen={expandedBoxes.rendaFixa} onClick={() => toggleExpandedBox('rendaFixa')}>
                  {expandedBoxes.rendaFixa ? '-' : '+'}
                </BtnOpen>
            </Top>
                {expandedBoxes.rendaFixa && (
                <div>
                  {investimentosRendaFixa.map((investimento, index) => (
                    <Investimento key={index}>
                      <p>{investimento.titulo}</p>
                      <p>Quantidade: {investimento.quantidade}</p>
                      <p>Valor: R${investimento.valor}</p>
                      <Btns>
                    <BtnEdit onClick={openModal} >
                      <svg height="1em" viewBox="0 0 512 512">
                        <path
                          d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                        ></path>
                      </svg>
                    </BtnEdit>
                    <BtnDelete onClick={() => deleteInvestimento(investimento.id)}>
                    <svg
                          className="bin-top"
                          viewBox="0 0 39 7"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <line y1="5" x2="39" y2="5" stroke="white" stroke-width="4"></line>
                          <line
                            x1="12"
                            y1="1.5"
                            x2="26.0357"
                            y2="1.5"
                            stroke="white"
                            stroke-width="3"
                          ></line>
                        </svg>
                        <svg
                          className="bin-bottom"
                          viewBox="0 0 33 39"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <mask id="path-1-inside-1_8_19" fill="white">
                            <path
                              d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                            ></path>
                          </mask>
                          <path
                            d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                            fill="white"
                            mask="url(#path-1-inside-1_8_19)"
                          ></path>
                          <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
                          <path d="M21 6V29" stroke="white" stroke-width="4"></path>
                        </svg>
                    </BtnDelete>
                    </Btns>        
                    </Investimento>
                    ))}
                </div>
              )}
          </ExpandedBox>

          <ExpandedBox isOpen={expandedBoxes.poupanca}>
              <Top isOpen={expandedBoxes.poupanca} color={colors[5]}>
                <SubTitle borderColor="#4f46e5">Poupança</SubTitle>
                <BtnOpen isOpen={expandedBoxes.poupanca} onClick={() => toggleExpandedBox('poupanca')}>
                  {expandedBoxes.poupanca ? '-' : '+'}
                </BtnOpen>
              </Top>
              {expandedBoxes.poupanca && (
                <div>
                  {investimentosPoupanca.map((investimento, index) => (
                    <Investimento key={index}>
                      <p>{investimento.titulo}</p>
                      <p>Quantidade: {investimento.quantidade}</p>
                      <p>Valor: R${investimento.valor}</p>
                      <Btns>
                    <BtnEdit onClick={openModal} >
                      <svg height="1em" viewBox="0 0 512 512">
                        <path
                          d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                        ></path>
                      </svg>
                    </BtnEdit>
                    <BtnDelete onClick={() => deleteInvestimento(investimento.id)}>
                    <svg
                          className="bin-top"
                          viewBox="0 0 39 7"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <line y1="5" x2="39" y2="5" stroke="white" stroke-width="4"></line>
                          <line
                            x1="12"
                            y1="1.5"
                            x2="26.0357"
                            y2="1.5"
                            stroke="white"
                            stroke-width="3"
                          ></line>
                        </svg>
                        <svg
                          className="bin-bottom"
                          viewBox="0 0 33 39"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <mask id="path-1-inside-1_8_19" fill="white">
                            <path
                              d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                            ></path>
                          </mask>
                          <path
                            d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                            fill="white"
                            mask="url(#path-1-inside-1_8_19)"
                          ></path>
                          <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
                          <path d="M21 6V29" stroke="white" stroke-width="4"></path>
                        </svg>
                    </BtnDelete>
                    </Btns>        
                    </Investimento>
                    ))}
                </div>
              )}
          </ExpandedBox>

        </Main>
      </LeftContainer>

      <RightContainer>
        <BoxRight>
            <h1>Carteira</h1>
            <CircleGrafico />
          <MiniBox style={{ marginTop: '-50px' }}>
            <Info>
              <h3>Valor Aplicado</h3>
              <h3>R${totalInvestido}</h3>
            </Info>
          </MiniBox>
          <MiniBox>
            <Info>
              <h3>Valor Atual</h3>
              <h3>R${saldo}</h3>
            </Info>
          </MiniBox>
          
          <BtnAtivo onClick={openModal}>Adicionar Ativo</BtnAtivo>
            {modalOpen && (
              <ModalInvestimento
                onClose={closeModal}
                walletId={wallet_id}
                onSubmit={(requestData: any) => {
                  setInvestimentoAdicionado(true);
                } } fetchInvestimentos={function (): void {
                  throw new Error('Function not implemented.');
                } }/>
              )}
        </BoxRight>
      </RightContainer>
    </Container>
  )
}

export default InvestimentoContent