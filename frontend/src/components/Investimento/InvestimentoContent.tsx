import React, { useEffect, useState } from 'react'
import { BoxRight, LeftContainer, RightContainer } from '../Carteira/CarteiraContent'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import CircleGrafico from '../Graficos/CircleGrafico'
import ModalInvestimento from './ModalInvestimento'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
  overflow: hidden;
  transition: height 0.3s;
  display: block;
  align-items: start;
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
background:#005954;
color: black;
`

interface Investimento {
  id: number;
  categoria: string;
}

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

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false);
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
                    {/* Adicione mais informações se necessário */}
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
              } }            />
            )}
        </BoxRight>
      </RightContainer>
    </Container>
  )
}

export default InvestimentoContent