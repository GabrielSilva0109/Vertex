import React, { ChangeEvent, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import Modal from "./ModalCarteira"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Info, MiniBox } from "../Investimento/InvestimentoContent"

export const Container = styled.div`
  display: flex;
  background: rgb(28, 28, 30);
  width: 100%;
  min-height: 100vh;
  color: white;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const LeftContainer = styled.div`
  flex: 3; 
  border-radius: 10px;
  margin:10px;
  display: flex;  
  flex-direction: column;
  align-items: center;
`

export const RightContainer = styled.div`
  flex: 1;
  border-radius: 10px;
  margin: 10px;
  gap: 10px;
  display: flex;
  flex-direction: column;
`

export const Main = styled.main`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  background: #2C2C2C;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  box-shadow: 10px 10px 10px rgba(12, 12, 10, 0.2); 
`

export const BtnAtivo = styled.button`
  background: #b0ff00;
  width: 200px;
  padding: 12px;
  border-radius: 20px;
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

export const BtnDespesa = styled.button`
  background: white;
  padding: 12px;
  width: 200px;
  border-radius: 20px;
  color: black;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background: #dfdfdf;
  }
`

export const BoxRight = styled.div`
  height: 100%;
  border-radius: 1rem;
  background-image: linear-gradient(43deg, #cdcdcd 0%, #bfc1c1b3 46%, #8f8f8f 100%);
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
  display: flex;
  gap:10px;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  overflow: auto;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0px; 
  }
  &::-webkit-scrollbar-thumb {
    background-color: #bfc1c1b3;
    border-radius: 10px;
  }
`

const Extrato =  styled.div`
  width: 90%;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  &::-webkit-scrollbar-thumb {
    background-color: transparent; 
    border-radius: 10px;
  }
`

const ExtratoItem = styled.div<{categoria: string}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
  margin: 5px;
  background-color: gray;
  border-radius: 8px;
  color: white;
  font-weight: bold;

  background-color: ${(props) =>
    props.categoria === 'ativo' ? '#4CAF50' : props.categoria === 'despesa' ? '#FF5733' : 'gray'};
`

const ImgPerfil = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: white;
  transition: 0.8s;
  margin-top: 15px;
  &:hover{
    background: #d9d9d9;
  }
`

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

interface Transacao {
  id: number;
  titulo: string;
  valor: number;
  observacao: string
  categoria: string
  fonte: string
  data: string 
}

const CarteiraContent: React.FC = () =>{
    const { state } = useLocation()
    const user = state?.user    
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false) 
    const idUser = user.id
    const [IdWallet, setIdWallet] = useState('')
    const dataAtual = new Date()
    const dataFormatada = `${dataAtual.getFullYear()}-${dataAtual.getMonth() + 1}-${dataAtual.getDate()}`
    const [saldo, setSaldo] = useState<number | null>(null)
    const [ativos, setAtivos] = useState<number | null>(null)
    const [despesas, setDespesas] = useState<number | null>(null)
    const [extrato, setExtrato] = useState<Transacao[] | []>([])
    const [formData, setFormData] = useState({
      wallet_id: IdWallet,
      titulo: '',
      valor: '',
      observacao: '',
      categoria: '',
      fonte: '',
      data: dataFormatada
    })
    const [isDespesa, setIsDespesa] = useState(false)

    const formatarData = (data: string): string => {
      const dataObj = new Date(data)
      const dia = String(dataObj.getDate()).padStart(2, '0')
      const mes = String(dataObj.getMonth() + 1).padStart(2, '0')
      const ano = dataObj.getFullYear()
    
      return `${dia}/${mes}/${ano}`
    }

    const formatarSaldo = (saldo: number): string => {
      return saldo.toFixed(2)
    }
    
    const handleCheckboxChange = () => {
      setIsDespesa((prevValue) => !prevValue);
    }
    
    const onSubmit = async () => {
      if (isDespesa) {
        await adicionarDespesa();
      } else {
        await adicionarAtivo();
      }
      closeModal();
    }

    const openModal = () => {
      setIsModalOpen(true)
    }
  
    const closeModal = () => {
      setIsModalOpen(false)
      // Limpar o formulário ou fazer outras ações necessárias ao fechar o modal
      setFormData({
        wallet_id: IdWallet,
        titulo: '',
        valor: '',
        observacao: '',
        categoria: '',
        fonte: '',
        data: dataFormatada
      })
    }

    const walletUser = async () => {
      try {
        const response = await fetch(`http://localhost:3333/walletUser/${idUser}`)
        if (response.ok) {
          const data = await response.json()
          setIdWallet(data.id)
          setSaldo(data.saldo)
          setAtivos(data.ativos)
          setDespesas(data.despesas)
        } else {
          console.error("Erro na resposta da requisição:", response.status)
          toast.error("Deu ERRADO o Id Wallet")
        }
      } catch (error) {
        console.error("Erro ao buscar carteira:", error)
      }
      
    }

    const adicionarAtivo = async () => {
      try {    
        // Cadastra a transação
        const response = await fetch('http://localhost:3333/ativo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({...formData, wallet_id: IdWallet}),
        });
    
        if(response.ok){
          toast.success('Ativo cadastrado !')
          await getExtrato();
        } else {
          toast.error('Erro ao fazer requisição para cadastrar o ativo!')
        }
      } catch (error) {
        console.error("Erro ao adicionar ativo:", error);
        toast.error('Erro ao cadastrar ativo!');
      }
    }
    
    const adicionarDespesa = async () => {
      try {   
        // Cadastra a transação
        const response = await fetch("http://localhost:3333/despesa", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, wallet_id: IdWallet }),
        })
    
        if (response.ok) {
          toast.success("Despesa cadastrada !")
          await getExtrato()
        } else {
          toast.error("Erro ao fazer requisição para cadastrar a despesa!")
        }
      } catch (error) {
        console.error("Erro ao adicionar despesa:", error)
        toast.error("Erro ao cadastrar despesa!");
      }
    }
    
    const getExtrato = async () => {
      try {
        const ativosResponse = await fetch(`http://localhost:3333/ativosWallet/${IdWallet}`)
        const despesasResponse = await fetch(`http://localhost:3333/despesasWallet/${IdWallet}`)
  
        const ativos =  (await ativosResponse.json()).map((ativo: any) => ({ ...ativo, categoria: 'ativo'}))
        const despesas = (await despesasResponse.json()).map((despesa: any) => ({...despesa, categoria: 'despesa'}))
  
        const todasTransacoes: Transacao[] = [...ativos, ...despesas]

      // Ordene as transações por data
      todasTransacoes.sort((a, b) => {
        const dateA = new Date(a.data).getTime();
        const dateB = new Date(b.data).getTime();

        if (dateA < dateB) {
          return 1;
        } else if (dateA > dateB) {
          return -1;
        } else {
          return 0;
        }
        });
  
        setExtrato(todasTransacoes);
      } catch (error) {
        console.error("Erro ao obter extrato:", error);
      }
    }

    const deleteTransacao = async (transacaoId: number, categoria: string, valor: number) => {
      try {
        let url
        let colunaAPI
    
        if (categoria === 'ativo') {
          url = `http://localhost:3333/ativo/${transacaoId}`
          colunaAPI = 'ativos'
        } else if (categoria === 'despesa') {
          url = `http://localhost:3333/despesa/${transacaoId}`
          colunaAPI = 'despesas'
        } else {
          console.warn('Categoria desconhecida:', categoria)
          return
        }
    
        // Obtém o valor atual da coluna
        const walletResponse = await fetch(`http://localhost:3333/wallet/${IdWallet}`)
        if (!walletResponse.ok) {
          toast.error("Erro ao obter o saldo!")
          return
        }
    
        const walletData = await walletResponse.json()
        const colunaAtual = walletData[colunaAPI]
    
        // Exclui a transação
        const response = await fetch(url, {
          method: 'DELETE',
        })
    
        if (!response.ok) {
          toast.error(`Erro ao excluir ${categoria}!`)
          return
        } else {
          toast.success(`Transação Excluída !!`)
        }
    
        // Atualiza o extrato após a exclusão
        await getExtrato();
      } catch (error) {
        console.error(`Erro ao excluir ${categoria}:`, error)
        toast.error(`Erro ao excluir ${categoria}`)
      }
    }

    const fetchData = async () => {
      try {
        await walletUser()
        await getExtrato()
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
      }
    }
  
    useEffect(() => {
      fetchData()
    }, [IdWallet])
    
    return(
        <Container>
        <LeftContainer>  
          <Main>
            <h1>Extrato</h1>
            <Extrato>
              {extrato.map((transacao) => (
                <ExtratoItem key={transacao.id} categoria={transacao.categoria}>
                  <p>{transacao.titulo}</p>
                  <p>R${formatarSaldo(transacao.valor)}</p>
                  <p>{transacao.observacao}</p>
                  <p>{transacao.fonte}</p>
                  <p>{formatarData(transacao.data)}</p>
                  <Btns>
                    <BtnEdit >
                      <svg height="1em" viewBox="0 0 512 512">
                        <path
                          d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                        ></path>
                      </svg>
                    </BtnEdit>
                    <BtnDelete onClick={() => deleteTransacao(transacao.id,  transacao.categoria, transacao.valor)}>
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
                </ExtratoItem>
              ))}
            </Extrato>
          </Main>
        </LeftContainer>
  
        <RightContainer>
          <BoxRight>
          <ImgPerfil></ImgPerfil>
            <h4>{user.name}</h4>
            <MiniBox>
              <Info>
                <h3>Saldo</h3><h4>R${saldo}</h4>   
              </Info>
              <Info>
                <h3>Ativos</h3><h4>R${ativos}</h4>   
              </Info>
              <Info>
                <h3>Despesas</h3><h4>R${despesas}</h4>   
              </Info>
              <Info>
                <h3>Investimento</h3><h4>R${saldo}</h4>   
              </Info>
            </MiniBox>
            
            <BtnAtivo onClick={openModal}>Adicionar Transação</BtnAtivo>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={onSubmit}
                formData={formData}
                setFormData={setFormData}
                isDespesa={isDespesa}
                onCheckboxChange={handleCheckboxChange}
              />
          </BoxRight>
        </RightContainer>
      </Container>
    )
}

export default CarteiraContent