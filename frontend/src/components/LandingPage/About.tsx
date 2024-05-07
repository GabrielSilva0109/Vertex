import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-itens: center;
    background: #2C2C2E;
`

const Card = styled.div`
    background: #b0ff00;
    width: 92%;
    height: 200px;
    padding: 20px;
    margin: 20px;
    border-radius: 8px;
`

const Title = styled.div`
    font-size: 2.5rem;
    color: black;
    font-weight: bold;
    display: flex;
    align-items: center;
`

const About: React.FC = () => {
    return (
        <Container>
            <Card>
                <Title>
                  Vertex
                </Title>
            </Card>
        </Container>
    )
}

export default About