import React from  'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

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

const NoticiasContent: React.FC = () => {
  const { state } = useLocation()
  const user = state?.user
  const navigate = useNavigate()

  
    return (
        <Container>

        </Container>
    )
}

export default NoticiasContent