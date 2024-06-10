import React, { useEffect, useState } from "react"
import styled from "styled-components"
import iconAcoes from '../../IMG/iconsAcoes.png'
import iconCoin from '../../IMG/iconsCoin.png'
import iconBitcoin from '../../IMG/iconsBitcoin.png'
import iconCard from '../../IMG/iconsCard.png'
import iconDespesa from '../../IMG/iconsDespesa.png'
import iconInvestimento from '../../IMG/iconsInvestimento.png'
import iconSaldo from '../../IMG/iconsSaldo.png' 
import { useLocation } from "react-router-dom"
import axios from "axios"
import bnb from '../../IMG/bnb2.svg'
import btc from '../../IMG/bitcoin.svg'
import cardano from '../../IMG/cardano.svg'
import eth from '../../IMG/eth.svg'
import solana from '../../IMG/solana.png'
import xrp from '../../IMG/xrp.svg'
import litecoin from '../../IMG/litecoin.png'
import monero from '../../IMG/monero.png'
import polkadot from '../../IMG/polkadot.png'
import uniswap from '../../IMG/uniswap.png'
import gmx from '../../IMG/gmx.png'
import Grafico from "../Graficos/Grafico"
import appleIcon from '../../IMG/apple.png'
import amazonIcon from '../../IMG/amazonIcon.png'
import googleIcon from '../../IMG/googleIcon.png'
import microsoftIcon from '../../IMG/microsoftIcon.png'
import teslaIcon from '../../IMG/teslaIcon.png'
import netflixIcon from '../../IMG/netflixIcon.png'
import metaIcon from '../../IMG/facebookIcon.png'
import nvidiaIcon from '../../IMG/nvidiaIcon.png'
import intelIcon from '../../IMG/intelcon.png'
import paypalIcon from '../../IMG/paypalIcon.png'
import Modal from "./Modal"

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
  padding: 10px;
  max-height: 48vh;
  min-height: 48vh; 
  border-radius: 1rem;
  background: rgba(255,255,255,.05);
  box-shadow: 0 0 10px rgba(0,0,0,0.25);
  overflow-y: auto; 
  border-radius: 8px;
  scrollbar-width: none; 
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

const AcoesA = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  align-items: center;
  gap: 10px;
  margin: 0px;
  padding: 0px;
`

const ImgAcoes = styled.img`
  width: 30px;
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
  width: 100px;
  @media (max-width: 768px) {
    width: 70%;
  }
`

const BtnInfo = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: .9rem;
  font-weight: bold;
  text-align: start;
  cursor: pointer;
  transition: 1s;
  &:hover{
    color: gray;
  
  }
`

const Content: React.FC = () =>{
    const [ cryptoData, setCryptoData] = useState<any[]>([])
    const [ saldo, setSaldo] = useState<number>(0)
    const [ ativos, setAtivos] = useState<number>(0)
    const [ despesas, setDespesas] = useState<number>(0)
    const [ walletId, setWalletId] = useState<number>(0)
    const [totalInvestido, setTotalInvestido] = useState<number>(0)
    const [isLoadingCrypto, setIsLoadingCrypto] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)//lembrar de trocar apos a API AÇÔES
    const { state } = useLocation()
    const user = state?.user
    const [filtroTextoCrypto, setFiltroTextoCrypto] = useState("")
    const [filtroTextoStocks, setFiltroTextoStocks] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedCryptoName, setSelectedCryptoName] = useState<string | null>(null)

    //Teste antes de achar uma API para fazer varias requisições Gratuitas
    const [apple, setApple] = useState<number>(0)
    const [appleVari, setAppleVari] = useState<number>(0)
    const [amazon, setAmazon] = useState<number>(0)
    const [amazonVari, setAmazonVari] = useState<number>(0)
    const [google, setGoogle] = useState<number>(0)
    const [googleVari, setGoogleVari] = useState<number>(0)
    const [microsoft, setMicrosoft] = useState<number>(0)
    const [microsoftVari, setMicrosoftVari] = useState<number>(0)
    const [tesla, setTesla] = useState<number>(0)
    const [teslaVari, setTeslaVari] = useState<number>(0)
    const [netflix, setNetflix] = useState<number>(0)
    const [netflixVari, setNetflixVari] = useState<number>(0)
    const [meta, setMeta] = useState<number>(0)
    const [metaVari, setMetaVari] = useState<number>(0)
    const [nvidia, setNvidia] = useState<number>(0)
    const [nvidiaVari, setNvidiaVari] = useState<number>(0)
    const [paypal, setPaypal] = useState<number>(0)
    const [paypalVari, setPaypalVari] = useState<number>(0)
    const [intel, setIntel] = useState<number>(0)
    const [intelVari, setIntelVari] = useState<number>(0)

    const baseURL = 'http://localhost:3333/api/'

    //Wallet | Ativos | Despesas | Investimento 
    useEffect(() => {
      const fetchData = async () => {
        if (user && user.id) {
          try {
            const walletResponse = await fetch(
              `${baseURL}/walletUser/${user.id}`
            )
            if (!walletResponse.ok) throw new Error(`Erro na requisição: ${walletResponse.status} - ${walletResponse.statusText}`)
            const walletData = await walletResponse.json()
            setWalletId(walletData.id)
  
            const [ativosResponse, despesasResponse, investimentosResponse] = await Promise.all([
              fetch(`${baseURL}/ativosWallet/${walletData.id}`),
              fetch(`${baseURL}/despesasWallet/${walletData.id}`),
              fetch(`${baseURL}/walletInvestimentos/${walletData.id}`)
            ])
  
            if (!ativosResponse.ok || !despesasResponse.ok || !investimentosResponse.ok) {
              throw new Error(`Erro na requisição: ${ativosResponse.status} - ${ativosResponse.statusText}`)
            }
  
            const [ativosData, despesasData, investimentosData] = await Promise.all([
              ativosResponse.json(),
              despesasResponse.json(),
              investimentosResponse.json()
            ])
  
            const totalAtivos = ativosData.reduce((total: number, ativo: any) => total + ativo.valor, 0)
            setAtivos(totalAtivos)
  
            const totalDespesas = despesasData.reduce((total: number, despesa: any) => total + despesa.valor, 0)
            setDespesas(totalDespesas)
  
            let totalInvestido = 0
            investimentosData.forEach((investimento: any) => {
              totalInvestido += investimento.valor
            })
            setTotalInvestido(totalInvestido)
  
            setIsLoadingCrypto(false)
          } catch (error) {
            console.error("Erro ao buscar dados:", error)
          }
        }
      }
  
      fetchData()
    }, [user])

    //Cryto 
    useEffect(() => {
      const fetchCryptoData = async () => {
        try {
          setIsLoadingCrypto(true)
          const response = await axios.get(
            "https://api.coingecko.com/api/v3/coins/markets",
            {
              params: {
                vs_currency: "usd",
                ids:  "bitcoin,ethereum,binancecoin,cardano,solana,ripple,monero,litecoin,matic,bsw,gmx,uniswap,polkadot,pancakeswap",
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
            setIsLoadingCrypto(false)
          }
          
        } catch (error) {
          console.error("Erro ao buscar dados de criptomoedas:", error)
        }
      }
      const intervalId = setInterval(fetchCryptoData, 20000)
      return () => clearInterval(intervalId)
    }, [])
  
    //Saldo
    useEffect(() => {
      setSaldo(ativos - despesas)
    }, [ativos, despesas])

    //Stocks
    const fetchStockData = async (symbol: string) => {
      try {
        const ApiKey = "co6mvr9r01qj6a5mbgl0co6mvr9r01qj6a5mbglg"
        const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${ApiKey}`)

        if (!response.ok) {
          throw new Error("Erro ao buscar preço das ações")
        }

        const data = await response.json()
        const previousPrice = data.pc
        const currentPrice = data.c
        const priceChangePercentage = ((currentPrice - previousPrice) / previousPrice) * 100

        return { currentPrice, priceChangePercentage }
      } catch (error) {
        console.error("Ocorreu um erro ao obter os dados:", error)
        return { currentPrice: 0, priceChangePercentage: 0 }
      }
    }

    const fetchStocks = async () => {
      const symbols = ["AAPL", "AMZN", "MSFT", "GOOGL", "TSLA", "NFLX", "META", "NVDA", "PYPL", "INTC"]
    
      const stocksData = await Promise.all(
        symbols.map(async (symbol) => {
          const data = await fetchStockData(symbol);
          return { symbol, ...data };
        })
      );
    
      return stocksData;
    }
    
    useEffect(() => {
      if (user && user.id) {
        const fetchStocksData = async () => {
          try {
            const stocksData = await fetchStocks()
            stocksData.forEach((stock: any) => {
              switch (stock.symbol) {
                case "AAPL":
                  setApple(stock.currentPrice)
                  setAppleVari(stock.priceChangePercentage)
                  break
                case "AMZN":
                  setAmazon(stock.currentPrice)
                  setAmazonVari(stock.priceChangePercentage)
                  break
                case "GOOGL":
                  setGoogle(stock.currentPrice)
                  setGoogleVari(stock.priceChangePercentage)
                  break
                case "MSFT":
                  setMicrosoft(stock.currentPrice)
                  setMicrosoftVari(stock.priceChangePercentage)
                  break
                case "TSLA":
                  setTesla(stock.currentPrice)
                  setTeslaVari(stock.priceChangePercentage)
                  break
                // Adicione as novas ações aqui
                case "NFLX":
                  setNetflix(stock.currentPrice)
                  setNetflixVari(stock.priceChangePercentage)
                  break
                case "META":
                  setMeta(stock.currentPrice)
                  setMetaVari(stock.priceChangePercentage)
                  break
                case "NVDA":
                  setNvidia(stock.currentPrice)
                  setNvidiaVari(stock.priceChangePercentage)
                  break
                case "INTC":
                  setIntel(stock.currentPrice)
                  setIntelVari(stock.priceChangePercentage)
                  break
                case "PYPL":
                  setPaypal(stock.currentPrice)
                  setPaypalVari(stock.priceChangePercentage)
                  break
                default:
                  break
              }
            });
          } catch (error) {
            console.error("Ocorreu um erro ao buscar dados das ações:", error)
          }
        }
    
        const intervalId = setInterval(fetchStocksData, 20000)
    
        // Chame a função uma vez imediatamente para obter os dados iniciais
        fetchStocksData()
    
        return () => clearInterval(intervalId)
      }
    }, [user, walletId])

    const openModal = (cryptoName: string) => {
      setSelectedCryptoName(cryptoName);
      setIsModalOpen(true);
    }
  
    const closeModal = () => {
      setSelectedCryptoName(null);
      setIsModalOpen(false);
    }
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
          <h1>Gráfico </h1>
          <Grafico walletId={walletId} />
        </Main>
      </LeftContainer>
      
      <RightContainer>          
        <BoxRight>        
          <Title>
            <Icon src={iconBitcoin} />
            Crypto
            <InputSearch style={{marginLeft: '70px'}} placeholder="Pesquisar" value={filtroTextoCrypto} onChange={(e) => setFiltroTextoCrypto(e.target.value)}/>
          </Title>
          {isLoadingCrypto ? ( 
            <Loader></Loader>
            ) : (
              <>
            </>
            )}
          <CryptoPrice>
              {cryptoData
                .filter(crypto =>
                  crypto.id.toLowerCase().includes(filtroTextoCrypto.toLowerCase())
                )
                .map(crypto => (
                  <Crypto key={crypto.id}>
                    <Icon src={getCryptoIcon(crypto.id)} />
                    <AcoesA>
                    <BtnInfo onClick={() => openModal(crypto.id)}>
                      {crypto.id.toUpperCase()}
                    </BtnInfo>
                      <span> ${(crypto.current_price).toFixed(2)} </span>
                      <CryptoPriceChange positive={crypto.price_change_percentage_24h >= 0}>
                        {crypto.price_change_percentage_24h.toFixed(2)}%
                      </CryptoPriceChange>
                    </AcoesA>
                  </Crypto>
                ))}
          </CryptoPrice>
        </BoxRight>

        <BoxRight>
          <Title>
            <Icon src={iconAcoes} />
            Ações
            <InputSearch style={{ marginLeft: '82px' }} placeholder="Pesquisar" value={filtroTextoStocks} onChange={(e) => setFiltroTextoStocks(e.target.value)} />
          </Title>

            {[
              { name: "Apple", price: apple, variation: appleVari, icon: appleIcon },
              { name: "Amazon", price: amazon, variation: amazonVari, icon: amazonIcon },
              { name: "Google", price: google, variation: googleVari, icon: googleIcon },
              { name: "Microsoft", price: microsoft, variation: microsoftVari, icon: microsoftIcon },
              { name: "Tesla", price: tesla, variation: teslaVari, icon: teslaIcon },
              // Adicione mais ações aqui
              { name: "Netflix", price: netflix, variation: netflixVari, icon: netflixIcon },
              { name: "Meta", price: meta, variation: metaVari, icon: metaIcon },
              { name: "Nvidia", price: nvidia, variation: nvidiaVari, icon: nvidiaIcon },
              { name: "PayPal", price: paypal, variation: paypalVari, icon: paypalIcon },
              { name: "Intel", price: intel, variation: intelVari, icon: intelIcon }
            ].filter(stock =>
              stock.name.toLowerCase().includes(filtroTextoStocks.toLowerCase())
            ).map((stock, index) => (
              <Acoes key={index} style={{ marginTop: index === 0 ? 0 : "-15px" }}>
                <ImgAcoes src={stock.icon} />
                <AcoesA>
                  <h3>{stock.name}</h3>
                  <h4>${stock.price.toFixed(2)}</h4>
                  <CryptoPriceChange positive={stock.variation >= 0}>
                    <h4>{stock.variation.toFixed(2)}%</h4>
                  </CryptoPriceChange>
                </AcoesA>
              </Acoes>
            ))}
        </BoxRight>

      </RightContainer>
        {selectedCryptoName && (
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            cryptoName={selectedCryptoName} 
          />
        )}
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
            return xrp
      case "litecoin":
        return litecoin
      case "monero":
        return monero
      case "polkadot":
        return polkadot
      case "uniswap":
        return uniswap
      case "gmx":
        return gmx  
        
      default:
        return ""
    }
}