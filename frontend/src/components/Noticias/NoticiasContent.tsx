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
  align-items: center;
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

const Button = styled.button`
  background-color: #1c1c1e ;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
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
        <div>
        <Button onClick={handlePrevious} disabled={startIndex === 0}>-</Button>
        </div>
        
          {noticias.slice(startIndex, startIndex + 3).map((noticia: any, index: number) => (
            <Item key={index}>
              <h4>{noticia.title}</h4>
              <Text>{noticia.description}</Text>
              <a href={noticia.url} target="_blank" rel="noopener noreferrer">Leia mais</a>
            </Item>
          ))}
        <div>
          <Button onClick={handleNext} disabled={startIndex + 3 >= noticias.length}>+</Button>
        </div>
      </BoxCrypto>
    </Container>
  ) 
}

export default NoticiasContent;
