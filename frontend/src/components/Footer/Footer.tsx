import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    height: 100px;
    background: #1c1c1e;
    width: 100;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Text = styled.p`
  font-weight: bold;
`

const Footer: React.FC = () => {
  return (
    <Container>
      <Text>© 2024 Vertex, Inc.</Text>
    </Container>
  )
}

export default Footer
