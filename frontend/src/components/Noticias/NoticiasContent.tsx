import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import world from "../Sections/img/world.png"
import crypto from '../Sections/img/crypto.png'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  background: rgb(28, 28, 30);
  width: 100%;
  min-height: 100vh;
  color: white;
`

const BoxNews = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
  border-radius: 20px;
  width: 70%;
  background: #2C2C2C;
  height: 400px;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`

const Image = styled.img`
  width: 100%;
  max-height: 40%;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background: linear-gradient(#e66465, #9198e5);
  transition: height 0.3s ease;
`

const Item = styled.div`
  width: 30%;
  height: 350px;
  background:black;
  border-radius: 30px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    width: 90%;
  }
`

const Title = styled.h4`
  align-self: flex-start;
  padding: 0px 10px;
  font-size: 0.8rem;
`

const Description = styled.p`
  font-weight: bold;
  padding: 0px 10px;
  font-size: 0.8rem;
  color: #999999;
  max-height: 100px;
  overflow-y: auto;
  margin-bottom: 10px;

  /* Estilos para o scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`

const CustomLink = styled.a`
  color: black;
  width: 60px;
  font-size: 0.8rem;
  font-weight: bold;
  text-decoration: none;
  background: #b0ff00;
  padding: 8px;
  border-radius: 10px;
  margin-top: auto;
  margin-bottom: 10px;
`

const Button = styled.button`
  background-color: #1c1c1e;
  border-radius: 50px;
  cursor: pointer;
  margin: 10px;
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  border: none;
  width: 30px;
  height: 30px;

  &:hover {
    background-color: white;
    color: black;
  }
`

const CurrencySlide = styled.div`
  display: flex;
  background-color: black;
  margin: 10px;
  gap: 10px;
`

const SlideBar = styled.div`
  margin: 0px;
  padding: 0px;
`

const PriceItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 10px;
`

const Main = styled.div`
  display: flex;
  gap: 40px;
`

const Box = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
`

const ImgMark = styled.img`
  max-width: 100%;

  @media (max-width: 768px) {
    display: none;
  }
`

const NoticiasContent: React.FC = () => {
  const [noticiasGerais, setNoticiasGerais] = useState([])
  const [noticiasCrypto, setNoticiasCrypto] = useState([])
  const [startIndexGerais, setStartIndexGerais] = useState(0)
  const [startIndexCrypto, setStartIndexCrypto] = useState(0)
  const [currencyData, setCurrencyData] = useState<any>(null)

  useEffect(() => {
    const fetchNoticiasGerais = async () => {
      try {
        const response = await fetch("https://newsapi.org/v2/everything?q=tecnologia&language=pt&apiKey=3ba975a9509b47f9958e5534f814dec7")
        const data = await response.json()
        const filteredData = data.articles.filter((noticia: { status: string }) => noticia.status !== "removed")
        setNoticiasGerais(filteredData)
      } catch (error) {
        console.error('Erro ao buscar notícias gerais:', error)
      }
    }

    const fetchNoticiasCrypto = async () => {
      try {
        const response = await fetch("https://newsapi.org/v2/everything?q=Crypto&language=pt&apiKey=3ba975a9509b47f9958e5534f814dec7")
        const data = await response.json();
        const filteredData = data.articles.filter((noticia: { status: string })  => noticia.status !== "removed")
        setNoticiasCrypto(filteredData)
      } catch (error) {
        console.error('Erro ao buscar notícias sobre criptomoedas:', error)
      }
    }

    const fetchCurrencyData = async () => {
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD')
        if (response.ok) {
          const data = await response.json()
          const filteredData = {
            USD: data.rates.USD, 
            EUR: data.rates.EUR,
            BRL: data.rates.BRL,
            JPY: data.rates.JPY,
            AUD: data.rates.AUD,
            CHF: data.rates.CHF,
            CAD: data.rates.CAD,
            CNY: data.rates.CNY,
            HKD: data.rates.HKD,
            SEK: data.rates.SEK,
          };
          setCurrencyData(filteredData);
        } else {
          throw new Error('Failed to fetch currency data');
        }
      } catch (error) {
        console.error('Error fetching currency data:', error);
      }
    };

    fetchNoticiasGerais();
    fetchNoticiasCrypto();
    fetchCurrencyData();
  }, [])

  const handleNextGerais = () => {
    setStartIndexGerais(startIndexGerais + 3)
  }

  const handlePreviousGerais = () => {
    setStartIndexGerais(Math.max(0, startIndexGerais - 3))
  }

  const handleNextCrypto = () => {
    setStartIndexCrypto(startIndexCrypto + 3)
  }

  const handlePreviousCrypto = () => {
    setStartIndexCrypto(Math.max(0, startIndexCrypto - 3))
  }

  const CustomPrevArrow = (props: any) => { return <></> } 
  const CustomNextArrow = (props: any) => { return <></> }

  const settings = {
    dots: false,
    infinite: true,
    speed: 9000,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1,
    prevArrow: <CustomPrevArrow />, 
    nextArrow: <CustomNextArrow />, 
  }

  return (
    <Container>
      <Main>
        <BoxNews>
          <Button onClick={handlePreviousGerais} disabled={startIndexGerais === 0}>-</Button>
          {noticiasGerais.slice(startIndexGerais, startIndexGerais + 3).map((noticia: any, index: number) => (
            <Item key={index}>
              <Image src={noticia.urlToImage} alt="Imagem da notícia" />
              <Title>{noticia.title}</Title>
              <Description>{noticia.description}</Description>
              <CustomLink href={noticia.url} target="_blank" rel="noopener noreferrer">Leia mais</CustomLink>
            </Item>
          ))}
          <Button onClick={handleNextGerais} disabled={startIndexGerais + 3 >= noticiasGerais.length}>+</Button>
        </BoxNews>
        <Box>
          <ImgMark src={world} />
        </Box>
      </Main>
      <SlideBar>
        {currencyData && (
          <Slider {...settings} >
            {Object.entries(currencyData).map(([currencyCode, rate]) => (
              <CurrencySlide key={currencyCode}>
                <PriceItems> 
                  <h3>{currencyCode}</h3>
                  <p>R$ {parseFloat(String(rate)).toFixed(2)}</p>
                </PriceItems>
              </CurrencySlide>
            ))}
          </Slider>
        )}
      </SlideBar>
      <Main>
        <Box>
          <ImgMark src={crypto} style={{ marginLeft: "20px" }} />
        </Box>
        <BoxNews style={{background: "#b0ff00"}}>
          <Button onClick={handlePreviousCrypto} disabled={startIndexCrypto === 0}>-</Button>
          {noticiasCrypto.slice(startIndexCrypto, startIndexCrypto + 3).map((noticia: any, index: number) => (
            <Item key={index}>
              <Image src={noticia.urlToImage} alt="Imagem da notícia" />
              <Title>{noticia.title}</Title>
              <Description>{noticia.description}</Description>
              <CustomLink href={noticia.url} target="_blank" rel="noopener noreferrer">Ler mais</CustomLink>
            </Item>
          ))}
          <Button onClick={handleNextCrypto} disabled={startIndexCrypto + 3 >= noticiasCrypto.length}>+</Button>
        </BoxNews> 
      </Main>
    </Container>
  )
}

export default NoticiasContent
