import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  background: rgb(28, 28, 30);
  width: 100%;
  min-height: 100vh;
  color: white;
`

const BoxCrypto = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
  border-radius: 20px;
  width: 70%;
  background: #2C2C2C;
  height: 400px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`

const BoxAcoes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
  border-radius: 20px;
  width: 70%;
  background: #b0ff00;
  height: 400px;
  margin-left: 370px;

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
  background-color: #1c1c1e ;
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
  }
`

const NoticiasContent: React.FC = () => {
  const [noticiasGerais, setNoticiasGerais] = useState([])
  const [noticiasCrypto, setNoticiasCrypto] = useState([])
  const [startIndexGerais, setStartIndexGerais] = useState(0)
  const [startIndexCrypto, setStartIndexCrypto] = useState(0)

  async function fetchNoticiasGerais() {
    try {
      const response = await fetch("https://newsapi.org/v2/everything?q=apple&language=pt&apiKey=3ba975a9509b47f9958e5534f814dec7")
      const data = await response.json()
      setNoticiasGerais(data.articles)
    } catch (error) {
      console.error('Erro ao buscar notícias gerais:', error)
    }
  }

  async function fetchNoticiasCrypto() {
    try {
      const response = await fetch("https://newsapi.org/v2/everything?q=Crypto&language=pt&apiKey=3ba975a9509b47f9958e5534f814dec7")
      const data = await response.json()
      setNoticiasCrypto(data.articles)
    } catch (error) {
      console.error('Erro ao buscar notícias sobre criptomoedas:', error)
    }
    
  }

  async function fetchPriceSheres(price:number) {
    
  }
  useEffect(() => {
    fetchNoticiasGerais()
    fetchNoticiasCrypto()
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

  return (
    <Container>
      <BoxCrypto>
        <div>
          <Button onClick={handlePreviousGerais} disabled={startIndexGerais === 0}>-</Button>
        </div>
        
        {noticiasGerais.slice(startIndexGerais, startIndexGerais + 3).map((noticia: any, index: number) => (
          <Item key={index}>
            <Image src={noticia.urlToImage} alt="Imagem da notícia" />
            <Title>{noticia.title}</Title>
            <Description>{noticia.description}</Description>
            <CustomLink href={noticia.url} target="_blank" rel="noopener noreferrer">Leia mais</CustomLink>
          </Item>
        ))}
        
        <div>
          <Button onClick={handleNextGerais} disabled={startIndexGerais + 3 >= noticiasGerais.length}>+</Button>
        </div>
      </BoxCrypto>

      <BoxAcoes>
        <div>
          <Button onClick={handlePreviousCrypto} disabled={startIndexCrypto === 0}>-</Button>
        </div>
        
        {noticiasCrypto.slice(startIndexCrypto, startIndexCrypto + 3).map((noticia: any, index: number) => (
          <Item key={index}>
            <Image src={noticia.urlToImage} alt="Imagem da notícia" />
            <Title>{noticia.title}</Title>
            <Description>{noticia.description}</Description>
            <CustomLink href={noticia.url} target="_blank" rel="noopener noreferrer">Leia mais</CustomLink>
          </Item>
        ))}
        
        <div>
          <Button onClick={handleNextCrypto} disabled={startIndexCrypto + 3 >= noticiasCrypto.length}>+</Button>
        </div>
      </BoxAcoes>
    </Container>
  ) 
}

export default NoticiasContent
