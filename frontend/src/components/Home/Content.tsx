import React, { useEffect, useState } from "react"
import styled from "styled-components"
import iconAcoes from '../Sections/img/iconsAcoes.png'
import iconCoin from '../Sections/img/iconsCoin.png'
import iconBitcoin from '../Sections/img/iconsBitcoin.png'
import iconCard from '../Sections/img/iconsCard.png'
import iconDespesa from '../Sections/img/iconsDespesa.png'
import iconInvestimento from '../Sections/img/iconsInvestimento.png'
import iconSaldo from '../Sections/img/iconsSaldo.png' 
import { useLocation } from "react-router-dom"
import axios from "axios"
import bnb from '../Sections/img/bnb2.svg'
import btc from '../Sections/img/bitcoin.svg'
import cardano from '../Sections/img/cardano.svg'
import eth from '../Sections/img/eth.svg'
import solana from '../Sections/img/solana.png'
import xrp from '../Sections/img/xrp.svg'

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

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const Box = styled.div`
  width: 30%;
  height: 150px;
  border-radius: 30px;
  padding: 5px;
  box-shadow: 10px 10px 10px rgba(12, 12, 10, 0.2);
  background: #2C2C2C;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-evenly;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
`

const Main = styled.main`
  display: flex;
  justify-content: center;
  background: #2C2C2C;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  margin-top: 10px;
  box-shadow: 10px 10px 10px rgba(12, 12, 10, 0.2); 
`

const BoxRight = styled.div`
  padding: 5px;
  height: 48%;
  border-radius: 1rem;
  background-color: ;
  background-image: linear-gradient(43deg, #cdcdcd 0%, #bfc1c1b3 46%, #8f8f8f 100%);
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;

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


const Title = styled.h1`
  color: white;
  font-size: 1.5rem;
  padding: 0px;
  margin:0px;
  display: flex;
  align-items: center;
  justify-content: start;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const Icon = styled.img`
  width: 35px;
`

const CryptoPrice = styled.div`
  display: flex;
  gap:5px;
  align-items: start;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 10px;
`

const Crypto = styled.div`
    display: flex;
    align-items: center;
    margin: 5px;
    font-weight: bold;
    gap:5px;
    width: 100%;
`

const Info = styled.div`
  color: #b0ff00;
  font-size: 1.5rem;
  padding: 5px;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const CryptoPriceChange = styled.span<{ positive: boolean }>`
  color: ${({ positive }) => (positive ? '#b0ff00' : 'red')};
`

const Content: React.FC = () =>{
    const [acoesBrasileiras, setAcoesBrasileiras] = useState<any[]>([])
    const [ cryptoData, setCryptoData] = useState<any[]>([])
    const [ saldo, setSaldo] = useState<number>(0)
    const { state } = useLocation()
    const user = state?.user

  const fetchSaldo = async (userId: number) => {
    try {
      const response = await fetch(`http://localhost:3333/walletUser/${userId}`);
      
      if (!response.ok) {
        console.error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        return;
      }

      const data = await response.json();

      if (data && data.saldo !== undefined) {
        setSaldo(data.saldo);
      } else {
        console.error(`Resposta inesperada do servidor: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      console.error("Erro ao buscar saldo:", error);
    }
  }

  useEffect(() => {
    if (user && user.id) {
      fetchSaldo(user.id)
      fetchCryptoData()
      fetchAcoesBrasileiras()
      const intervalId = setInterval(fetchCryptoData, 20000)

     return () => clearInterval(intervalId)
    }
  }, [user])

  const fetchCryptoData = async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            ids: "bitcoin,ethereum,binancecoin,cardano,solana,ripple",
            order: "market_cap_desc",
            per_page: 100,
            page: 1,
            sparkline: false,
            price_change_percentage: "1h,24h,7d",
          },
        }
      )

      if (response.status === 200) {
        setCryptoData(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar dados de criptomoedas:", error)
    }
  }

  const fetchAcoesBrasileiras = async () => {
    try {
      const response = await axios.get('http://localhost:3333/acoesBrasileiras');
      console.log('Resposta da API do Yahoo Finance:', response.data);
     
    } catch (error) {
      console.error('Erro ao buscar dados das ações brasileiras:', error);
    }
  }
  
  useEffect(() => {
    fetchCryptoData()
    fetchAcoesBrasileiras()
    const intervalId = setInterval(fetchCryptoData, 20000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <Container>
      <LeftContainer>
        <Top>
          <Box>
            <Title>
              <Icon src={iconSaldo} />
              Saldo
              <button>+</button>
            </Title>                        
            <Info>
              {saldo.toFixed(2)}
            </Info>
          </Box>
          <Box>
            <Title>
              <Icon src={iconInvestimento} />
              Investimento
            </Title>
            <Info style={{color: 'white'}}>
              {saldo.toFixed(2)}
            </Info>
          </Box>
          <Box>
            <Title>
              <Icon src={iconDespesa} />
              Despesa
            </Title>
            <Info style={{color: 'red'}}>
              {saldo.toFixed(2)}
            </Info>
          </Box>
        </Top>

        <Main>
          <h1>Carteira gráfico</h1>
          
        </Main>
      </LeftContainer>

      <RightContainer>
        <BoxRight>
          <Title>
            <Icon src={iconAcoes} />
            Ações
          </Title>
          <CryptoPrice>
            {acoesBrasileiras.map((acao) => (
              <Crypto key={acao.id}>
                <Icon src={iconAcoes} />
                <span>{acao.name.toUpperCase()}: R$ {acao.current_price}</span>
                {/* Adicione outros dados conforme necessário */}
              </Crypto>
            ))}
          </CryptoPrice>
        </BoxRight>
        <BoxRight>
          <Title>
            <Icon src={iconBitcoin} />
            Crypto
          </Title>
          <CryptoPrice>
            {cryptoData.map((crypto) => (
              <Crypto key={crypto.id}>
                <Icon src={getCryptoIcon(crypto.id)} />
                <span>{crypto.id.toUpperCase()}: ${crypto.current_price}</span>
                <CryptoPriceChange positive={crypto.price_change_percentage_24h >= 0}>
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </CryptoPriceChange>
              </Crypto>
            ))}
          </CryptoPrice>
        </BoxRight>
      </RightContainer>
    </Container>
  )
}

export default Content

function getCryptoIcon(cryptoId: string): string {
    switch (cryptoId) {
      case "bitcoin":
        return btc;
      case "ethereum":
        return eth;
      case "binancecoin":
        return bnb;
      case "cardano":
        return cardano;
      case "solana":
        return solana;
        case "ripple":
            return xrp;
      default:
        return ""
    }
  }
  