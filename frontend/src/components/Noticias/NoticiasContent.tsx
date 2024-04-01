import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: start;
  background: rgb(28, 28, 30);
  width: 100%;
  min-height: 100vh;
  color: white;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const BoxCrypto = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 30px;
  border-radius: 20px;
  width: 70%;
  background: #2C2C2C;
  height: 300px;
`

const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px;
  align-items: center; 
`

const Text = styled.p`
  font-size: 0.8rem;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`

const NoticiasContent: React.FC = () => {
  const { state } = useLocation()
  const [noticias, setNoticias] = useState([])
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    async function fetchNoticias() {
      try {
        const response = await fetch("https://newsapi.org/v2/everything?q=bitcoin&language=pt&apiKey=3ba975a9509b47f9958e5534f814dec7")
        const data = await response.json()
        setNoticias(data.articles)
      } catch (error) {
        console.error('Erro ao buscar notícias:', error)
      }
    }
    fetchNoticias()
  }, [])

  const handleNext = () => {
    setStartIndex(startIndex + 3);
  }

  const handlePrevious = () => {
    setStartIndex(Math.max(0, startIndex - 3));
  }

  return (
    <Container>
      <BoxCrypto>
        <Button onClick={handlePrevious} disabled={startIndex === 0}>-</Button>
          {noticias.slice(startIndex, startIndex + 3).map((noticia: any, index: number) => (
            <Item key={index}>
              <h4>{noticia.title}</h4>
              <Text>{noticia.description}</Text>
              <a href={noticia.url} target="_blank" rel="noopener noreferrer">Leia mais</a>
            </Item>
          ))}
        <Button onClick={handleNext} disabled={startIndex + 3 >= noticias.length}>+</Button>
      </BoxCrypto>
    </Container>
  ) 
}

export default NoticiasContent;
