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
  box-shadow: rgba(0, 0, 0, 0.17) 0px 0px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px 0px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px 0px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 0px 1px 0px, rgba(0, 0, 0, 0.09) 0px 0px 2px 0px, rgba(0, 0, 0, 0.09) 0px 0px 4px 0px, rgba(0, 0, 0, 0.09) 0px 0px 8px 0px, rgba(0, 0, 0, 0.09) 0px 0px 16px 0px, rgba(0, 0, 0, 0.09) 0px 0px 32px 0px;
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
  padding-bottom: 20px;
  width: 90%;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  &::-webkit-scrollbar-thumb {
    background-color: transparent; 
    border-radius: 10px;
  }
`

const ExtratoItem = styled.div<{ categoria: string; lastItem?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
  margin: 5px;
  color: white;
  font-weight: bold;
  color: white;
  border-bottom: ${props => (props.lastItem ? 'none' : '1px solid gray')}; 
`

const Dados = styled.p`
  max-width: 100px;
  min-width: 100px;
`

const Obs = styled.p<{ observacao: string }>`
  min-width: 100px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: start;
  border-radius: 10px;
  position: relative;
  padding-left: 20px;
  &::before {
    content: '';
    width: 15px;
    height: 15px;
    border-radius: 50%;
    position: absolute;
    left: 0;
    background-color: ${props => {
      switch (props.observacao) {
        case 'Alimentação':
          return '#005954'
        case 'Transporte':
          return '#0030bf'
        case 'Salario':
          return '#b0ff00'
        case 'Lazer':
          return 'purple';
        case 'Serviços':
          return 'orange'
        case 'Vestuario':
          return 'yellow'
        case 'Investimentos':
          return 'cyan'
        case 'Vale':
          return 'pink'
        case 'Serviços':
          return 'red'
        default:
          return 'gray'
      }
    }};
  }
`

const Valor = styled.p<{ categoria: string }>`
  max-width: 100px;
  min-width: 100px;
  width: 100px!important;
    color: ${(props) =>
      props.categoria === 'ativo'
        ? '#b0ff00'
        : props.categoria === 'despesa'
        ? '#ff2d00'
        : 'gray'};

`

const DadosData = styled.p`
  @media (max-width: 768px) {
    display:none;
  }
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

const BoxInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: 100%;
  padding-left: 30px;
  
`

const Label = styled.label`
  margin-bottom: -15px;
  color: #b0ff00cc;
  font-weight: bold;
`

const Filters = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`

const BtnTransacoes = styled.div`

`

const BtnTransacao = styled.button<BtnTransacaoProps>`
  padding: 8px 16px;
  border: none;
  background-color: ${props => props.selected ? '#b0ff00' : '#1c1c1e'};
  color: ${props => props.selected ? 'black' : 'white'};
  cursor: pointer;
  width: 100px;
  font-weight: bold;
  font-size: 1rem;
`

const InputSearch = styled.input`
  border: none;
  background: #1c1c1e;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  user-select: none!important;
  outline: none;

  @media (max-width: 768px) {
    width: 70%;
  }
`

interface Transacao {
  id: number
  titulo: string
  valor: number
  observacao: string
  categoria: string
  fonte: string
  data: string 
}

interface BtnTransacaoProps {
  selected: boolean
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
    const [isDespesa, setIsDespesa] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [filtroSelecionado, setFiltroSelecionado] = useState("Todas")
    const [filtroTexto, setFiltroTexto] = useState("")
    const [formData, setFormData] = useState({
      wallet_id: IdWallet,
      titulo: '',
      valor: '',
      observacao: '',
      categoria: '',
      fonte: '',
      data: dataFormatada
    })
    const baseURL = 'https://server-production-d3ab.up.railway.app/api'

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
        await adicionarDespesa()
      } else {
        await adicionarAtivo()
      }
      closeModal()
    }

    const openModal = () => {
      setIsModalOpen(true)
    }
  
    const closeModal = () => {
      setIsModalOpen(false)
    
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
        const response = await fetch(`${baseURL}/walletUser/${idUser}`)
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
        const response = await fetch(`${baseURL}/ativo`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({...formData, wallet_id: IdWallet}),
        })
    
        if(response.ok){
          toast.success('Ativo cadastrado !')
          await getExtrato()
        } else {
          toast.error('Erro ao fazer requisição para cadastrar o ativo!')
        }
      } catch (error) {
        console.error("Erro ao adicionar ativo:", error)
        toast.error('Erro ao cadastrar ativo!')
      }
    }
    
    const adicionarDespesa = async () => {
      try {   
        // Cadastra a transação
        const response = await fetch(`${baseURL}/despesa`, {
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
        toast.error("Erro ao cadastrar despesa!")
      }
    }
    
    const getExtrato = async () => {
      await walletUser()
      try {
        const ativosResponse = await fetch(`${baseURL}/ativosWallet/2`)
        const despesasResponse = await fetch(`${baseURL}/despesasWallet/1`)
  
        const ativos =  (await ativosResponse.json()).map((ativo: any) => ({ ...ativo, categoria: 'ativo'}))
        const despesas = (await despesasResponse.json()).map((despesa: any) => ({...despesa, categoria: 'despesa'}))
  
        const todasTransacoes: Transacao[] = [...ativos, ...despesas]

        setExtrato(todasTransacoes)
      } catch (error) {
        console.error("Erro ao obter extrato:", error)
      }
    }

    const deleteTransacao = async (transacaoId: number, categoria: string, valor: number) => {
      try {
        let url
        let colunaAPI
    
        if (categoria === 'ativo') {
          url = `${baseURL}/ativo/${transacaoId}`
          colunaAPI = 'ativos'
        } else if (categoria === 'despesa') {
          url = `${baseURL}/despesa/${transacaoId}`
          colunaAPI = 'despesas'
        } else {
          console.warn('Categoria desconhecida:', categoria)
          return
        }
    
        // Obtém o valor atual da coluna
        const walletResponse = await fetch(`${baseURL}/wallet/${IdWallet}`)
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
          <RightContainer>
            <BoxRight>
                <h2>{user.name}</h2>
              <BoxInfo>
                <Label >Email </Label>
                <h4>{user.email}</h4>
                <Label >CPF </Label>
                <h4>{user.cpf}</h4>
                <Label >CEP </Label>
                <h4>{user.cep}</h4>
                <Label >Nascimento </Label>
                <h4>{formatarData(user.birth)}</h4>
              </BoxInfo>

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

          <LeftContainer>  
            <Main>
              <h1>Extrato</h1>
              <Filters>
                <BtnTransacoes>
                  <BtnTransacao style={{borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px', }} selected={filtroSelecionado === "Todas"} onClick={() => setFiltroSelecionado("Todas")}>Todas</BtnTransacao>
                  <BtnTransacao selected={filtroSelecionado === "ativo"} onClick={() => setFiltroSelecionado("ativo")}>Ativos</BtnTransacao>
                  <BtnTransacao style={{borderTopRightRadius: '8px', borderBottomRightRadius: '8px', }} selected={filtroSelecionado === "despesa"} onClick={() => setFiltroSelecionado("despesa")}>Despesas</BtnTransacao>
                </BtnTransacoes>
                
                <InputSearch placeholder="Pesquisar" value={filtroTexto} onChange={(e) => setFiltroTexto(e.target.value)} />

              </Filters>
              <Extrato>
              {extrato
                  .filter(transacao =>
                    (filtroSelecionado === "Todas" || transacao.categoria === filtroSelecionado) &&
                    (filtroTexto === "" || transacao.titulo.toLowerCase().includes(filtroTexto.toLowerCase()))
                  )
                  .map((transacao, index) => (
                  <ExtratoItem key={transacao.id} categoria={transacao.categoria} lastItem={index === extrato.length - 1}>
                    <Dados>{transacao.titulo}</Dados>
                    <Obs observacao={transacao.observacao}>{transacao.observacao}</Obs>
                    <Dados>{transacao.fonte}</Dados>
                    <DadosData>{formatarData(transacao.data)}</DadosData>
                    <Valor categoria={transacao.categoria}>R${formatarSaldo(transacao.valor)}</Valor>
                    <Btns>
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
      </Container>
    )
}

export default CarteiraContent