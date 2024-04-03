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
import Grafico from "../Graficos/Grafico"
import appleIcon from '../Sections/img/apple.png'

const Container = styled.div`
  display: flex;
  background: rgb(28, 28, 30);
  width: 100%;
  
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
  width: 100%;
  gap: 5px;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
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

  @media (max-width: 768px) {
    width: auto;
  }
`

const Main = styled.main`
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: center;
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
  border-radius: 50%;
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

const Loader = styled.div`
  width: 30px;
  height: 30px;
  display: grid;
  border-radius: 50%;
  -webkit-mask: radial-gradient(farthest-side, #0000 40%, #000 41%);
  background: linear-gradient(0deg, #b0ff01 50%, #9adf00 0) center / 4px 100%, linear-gradient(59deg, #80b900 50%, #b0ff00 0) center / 100% 4px;
  background-repeat: no-repeat;
  animation: s3 1s infinite steps(12);
  margin: 0px 10px;
  &::before,
  &::after {
    content: "";
    grid-area: 1/1;
    border-radius: 50%;
    background: inherit;
    opacity: 0.915;
    transform: rotate(30deg);
  }

  &::after {
    opacity: 0.83;
    transform: rotate(60deg);
  }

  @keyframes s3 {
    100% {
      transform: rotate(1turn);
    }
  }
`

const Acoes = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0px;
  padding: 0px;
`
const Content: React.FC = () =>{
    const [ cryptoData, setCryptoData] = useState<any[]>([])
    const [ saldo, setSaldo] = useState<number>(0)
    const [ ativos, setAtivos] = useState<number>(0)
    const [ despesas, setDespesas] = useState<number>(0)
    const [ walletId, setWalletId] = useState<number>(0)
    const [totalInvestido, setTotalInvestido] = useState<number>(0)
    const { state } = useLocation()
    const [isLoadingCrypto, setIsLoadingCrypto] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)//lembrar de trocar apos a API AÇÔES
    const user = state?.user
    const [apple, setApple] = useState<number>(0)
    const [amazon, setAmazon] = useState<number>(0)
    const [google, setGoogle] = useState<number>(0)
    const [microsoft, setMicrosoft] = useState<number>(0)
    const [tesla, setTesla] = useState<number>(0)


    const fetchWallet = async (userId: number) => {
      try {
        const response = await fetch(`http://localhost:3333/walletUser/${userId}`);
        if (!response.ok) {
          console.error(`Erro na requisição: ${response.status} - ${response.statusText}`);
          return 
        }

        const data = await response.json()

        if (data && data.saldo !== undefined) {
          setWalletId(data.id)
        } else {
          console.error(`Resposta inesperada do servidor: ${JSON.stringify(data)}`)
        }
      } catch (error) {
        console.error("Erro ao buscar saldo:", error)
      }
    }

    const fetchAtivos = async (userId: number) => {
      try {
        await fetchWallet(userId)

        const response = await fetch(`http://localhost:3333/ativosWallet/${walletId}`)
        
        if (!response.ok) {
          console.error(`Erro na requisição ATIVOS: ${response.status} - ${response.statusText}`)
          return 
        }

        const data = await response.json()
    
        if (data && data.length > 0) {
          // Somando os valores dos ativos
          const totalAtivos = data.reduce((total: number, ativo: any) => total + ativo.valor, 0)
          setAtivos(totalAtivos)
        } else {
          console.error(`Resposta inesperada do servidor: ${JSON.stringify(data)}`)
        }
      } catch (error) {
        console.error("Erro ao buscar ativos:", error)
      }
    }

    const fetchDespesas = async(userId: number) =>{
      try {
        await fetchWallet(userId)

        const response = await fetch(`http://localhost:3333/despesasWallet/${walletId}`)
        
        if (!response.ok) {
          console.error(`Erro na requisição DESPESAS: ${response.status} - ${response.statusText}`)
          return 
        }

        const data = await response.json()
    
        if (data && data.length > 0) {
          // Somando os valores das despesas
          const totalDespesas = data.reduce((total: number, despesa: any) => total + despesa.valor, 0)
          setDespesas(totalDespesas)
        } else {
          console.error(`Resposta inesperada do servidor: ${JSON.stringify(data)}`)
        }
      } catch (error) {
        console.error("Erro ao buscar ativos:", error)
      }
    }

    const fetchCryptoData = async () => {
      try {
        setIsLoadingCrypto(true)
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
          setCryptoData(response.data)
        }
        setIsLoadingCrypto(false)
      } catch (error) {
        console.error("Erro ao buscar dados de criptomoedas:", error)
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
      } catch (error) {
        console.error("Erro ao buscar os investimentos da carteira:", error)
      }
    }

    const fetchApple = async () => {
      try{
        const ApiKey = "co6mvr9r01qj6a5mbgl0co6mvr9r01qj6a5mbglg"
        const symbol = "AAPL"
        const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${ApiKey}`)

        if(!response.ok){
          console.log("Erro ao trazer preço das ações")
          return
        }
        const data = await response.json()
        console.log("Retorno APPLE", data)
        setApple(data.c)

      } catch (erro) {
        
      }
    }

    const fetchAmazon = async () => {
      try{
        const ApiKey = "co6mvr9r01qj6a5mbgl0co6mvr9r01qj6a5mbglg"
        const symbol = "AMZN"
        const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${ApiKey}`)

        if(!response.ok){
          console.log("Erro ao trazer preço das ações")
          return
        }
        const data = await response.json()
        console.log("Retorno Amazon", data)
        setAmazon(data.c)

      } catch (erro) {
        
      }
    }

    const fetchMicrosoft = async () => {
      try{
        const ApiKey = "co6mvr9r01qj6a5mbgl0co6mvr9r01qj6a5mbglg"
        const symbol = "MSFT"
        const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${ApiKey}`)

        if(!response.ok){
          console.log("Erro ao trazer preço das ações")
          return
        }
        const data = await response.json()
        console.log("Retorno Amazon", data)
        setMicrosoft(data.c)

      } catch (erro) {
        
      }
    }

    const fetchGoogle = async () => {
      try{
        const ApiKey = "co6mvr9r01qj6a5mbgl0co6mvr9r01qj6a5mbglg"
        const symbol = "GOOGL"
        const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${ApiKey}`)

        if(!response.ok){
          console.log("Erro ao trazer preço das ações")
          return
        }
        const data = await response.json()
        console.log("Retorno GOOGLE", data)
        setGoogle(data.c)

      } catch (erro) {
        
      }
    }

    const fetchTesla = async () => {
      try{
        const ApiKey = "co6mvr9r01qj6a5mbgl0co6mvr9r01qj6a5mbglg"
        const symbol = "TSLA"
        const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${ApiKey}`)

        if(!response.ok){
          console.log("Erro ao trazer preço das ações")
          return
        }
        const data = await response.json()
        console.log("Retorno TESLA", data)
        setTesla(data.c)

      } catch (erro) {
        
      }
    }

    useEffect(() => {
      if (user && user.id) {
        fetchWallet(user.id)
        fetchCryptoData()
        fetchAtivos(walletId)
        fetchDespesas(walletId)
        fetchInvestimentos(walletId)
        fetchApple()
        fetchAmazon()
        fetchGoogle()
        fetchMicrosoft()
        fetchTesla()

        const intervalId = setInterval(fetchCryptoData, 20000)

      return () => clearInterval(intervalId)
      }
    }, [user, walletId])

    // Atualiza o saldo quando os valores de ativos e despesas mudam
    useEffect(() => {
      setSaldo(ativos - despesas)
    }, [ativos, despesas])


  return (
    <Container>
      <LeftContainer>
        <Top>
          <Box>
            <Title>
                <Icon src={iconSaldo} />
                Saldo
            </Title>                        
            <Info>
              R${saldo.toFixed(2)}
            </Info>
          </Box>
          <Box>
            <Title>
                <Icon src={iconInvestimento} />
                Investimentos
            </Title>                        
            <Info style={{color: "white"}}>
              R${totalInvestido.toFixed(2)}
            </Info>
          </Box>
          <Box>
            <Title>
            <Icon src={iconSaldo} />
              Ativos
            </Title>
            <Info >
              R${ativos.toFixed(2)}
            </Info>
          </Box>
          <Box>
            <Title>
              <Icon src={iconDespesa} />
              Despesa
            </Title>
            <Info style={{color: 'red'}}>
              R${despesas.toFixed(2)}
            </Info>
          </Box>
        </Top>

        <Main>
          <h1>Carteira gráfico</h1>
          <Grafico walletId={walletId} />
        </Main>
      </LeftContainer>
      
      <RightContainer>          
        <BoxRight>        
          <Title>
            <Icon src={iconBitcoin} />
            Crypto
            {isLoadingCrypto ? ( 
            <Loader></Loader>
          ) : (
            <>
          </>
          )}
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

        <BoxRight>
            <Title>
              <Icon src={iconAcoes} />
              Ações
            </Title>
            <Acoes>
              <img src={appleIcon}/>
              <h3>Apple</h3>
              <p>{apple}</p>
            </Acoes>
            <Acoes>
              <h3>Amazon</h3>
              <p>{amazon}</p>

            </Acoes>
            <Acoes>
              <h3>Google</h3>
              <p>{google}</p>

            </Acoes>
            <Acoes>
              <h3>Microsoft</h3>
              <p>{microsoft}</p>

            </Acoes>
            <Acoes>
              <h3>Tesla</h3>
              <p>{tesla}</p>
            </Acoes>
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