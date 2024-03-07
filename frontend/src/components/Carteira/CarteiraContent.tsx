import React, { ChangeEvent, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import Modal from "./Modal"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Container = styled.div`
  display: flex;
  background: rgb(28, 28, 30);
  width: 100%;
  height: 100vh;
  color: white;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const LeftContainer = styled.div`
  flex: 3; 
  border-radius: 10px;
  margin:10px;
  display: flex;  
  flex-direction: column;
  align-items: center;
`

const RightContainer = styled.div`
  flex: 1;
  border-radius: 10px;
  margin: 10px;
  gap: 10px;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
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

const BoxRight = styled.div`
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

const ExtratoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
  margin: 5px;
  background-color: gray;
  border-radius: 8px;
  color: white;
  font-weight: bold;
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

const BtnDelete = styled.button`
  height: 50%;
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
        } else {
          console.error("Erro na resposta da requisição:", response.status)
          toast.error("Deu ERRADO o Id Wallet")
        }
      } catch (error) {
        console.error("Erro ao buscar carteira:", error)
      }
      
    }

    const adicionarAtivo = async () => {
      try{
        await walletUser()

        if (saldo === null) {
          toast.error("Erro ao obter o saldo!");
          return
        }

        const novoSaldo = saldo + parseFloat(formData.valor);

        const saldoAtualizadoResponse = await fetch(`http://localhost:3333/wallet/${IdWallet}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ saldo: novoSaldo }),
        });

        if (!saldoAtualizadoResponse.ok) {
          toast.error("Erro ao atualizar saldo!");
          return;
        }

        const response = await fetch('http://localhost:3333/ativo', {
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
          toast.error('Erro ao Requisição do ATIVO  !')
          console.log("erro na Requisição do ATIVO ", formData)
        }

      } catch (erro) {
        console.log("Erro ao Adicionar Transação")
        toast.error('Erro ao cadastrar ativo!')
      }
    }

    const adicionarDespesa = async () => {
      try {
        await walletUser();
  
        if (saldo === null) {
          toast.error("Erro ao obter o saldo!");
          return;
        }
  
        const novoSaldo = saldo - parseFloat(formData.valor); // Subtrai o valor da despesa
  
        const saldoAtualizadoResponse = await fetch(
          `http://localhost:3333/wallet/${IdWallet}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ saldo: novoSaldo }),
          }
        );
  
        if (!saldoAtualizadoResponse.ok) {
          toast.error("Erro ao atualizar saldo!");
          return;
        }
  
        const response = await fetch("http://localhost:3333/despesa", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, wallet_id: IdWallet }),
        });
  
        if (response.ok) {
          toast.success("Despesa cadastrada !");
          await getExtrato()
        } else {
          toast.error("Erro na Requisição da DESPESA  !");
          console.log("erro na Requisição da DESPESA ", formData);
        }
      } catch (erro) {
        console.log("Erro ao Adicionar Despesa");
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

    const deleteTransacao = async (transacaoId: number, categoria: string) => {
      try {
        console.log('ID da transação:', transacaoId);
        console.log('Categoria da transação:', categoria);
      } catch (error) {
        console.error('Erro ao excluir transação:', error);
        toast.error('Erro ao excluir transação');
      }
    }

    const fetchData = async () => {
      try {
        await walletUser();
        await getExtrato();
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
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
                <ExtratoItem key={transacao.id}>
                  <p>{transacao.titulo}</p>
                  <p>{transacao.valor}</p>
                  <p>{transacao.observacao}</p>
                  <p>{transacao.categoria}</p>
                  <p>{transacao.fonte}</p>
                  <p>{transacao.data}</p>
                  <div>
                    <BtnDelete>Editar</BtnDelete>
                    <BtnDelete onClick={() => deleteTransacao(transacao.id,  transacao.categoria)}>Excluir</BtnDelete>
                  </div>
                </ExtratoItem>
              ))}
            </Extrato>
          </Main>
        </LeftContainer>
  
        <RightContainer>
          <BoxRight>
          <ImgPerfil></ImgPerfil>
            <h4>
                {user.name}
            </h4>
            <p>{user.email}</p>
            <p>{user.cpf}</p>
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