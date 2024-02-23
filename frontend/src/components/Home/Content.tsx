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
    background: linear-gradient(43deg, #00ff9f 0%, #71ae8a 46%, #d0d6c3 100%);
    display: flex;
    align-items: center;
    justify-content: start;
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
    background-color: #b0ff00;
    background-image: linear-gradient(43deg, #b0ff00 0%, #5aa944 46%, #0193b0 100%);
    box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
`;


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

const Content: React.FC = () =>{
    const [saldo, setSaldo] = useState<number>(0)
    const { state } = useLocation()
    const user = state?.user

    // Função para buscar o saldo do usuário com base no ID e atualizar o estado local
    const fetchSaldo = async (userId: number) => {
        try {
            const response = await fetch(`http://localhost:3333/walletUser/${userId}`);
            
            if (!response.ok) {
                console.error(`Erro na requisição: ${response.status} - ${response.statusText}`);
                return;
            }
            console.log('Response: ', response)
            
            console.log('id: ', userId)
            const data = await response.json();

            console.log('data: ', data)
            if (data && data.saldo !== undefined) {
                setSaldo(data.saldo);
            } else {
                console.error(`Resposta inesperada do servidor: ${JSON.stringify(data)}`);
            }
        } catch (error) {
            console.error("Erro ao buscar saldo:", error);
        }
    };
    

    useEffect(() => {
        if (user && user.id) {
            fetchSaldo(user.id)
        }
    }, [user])

    return (
        <Container>
            <LeftContainer>
                <Top>
                    <Box>
                    <Title>
                        <Icon src={iconSaldo} />
                        Saldo  {saldo.toFixed(2)}
                    </Title>
                    
                    </Box>
                    <Box>
                    <Title>
                        <Icon src={iconInvestimento} />
                        Investimento
                    </Title>
                    </Box>
                    <Box>
                    <Title>
                        <Icon src={iconDespesa} />
                        Despesa
                        </Title>
                    </Box>
                </Top>

                <Main>
                    <h1>Carteira grafico</h1>

                </Main>
            </LeftContainer>

            <RightContainer>
                <BoxRight>
                    <Title>
                        <Icon src={iconAcoes} />
                        Ações
                    </Title>
                </BoxRight>
                <BoxRight>
                    <Title>
                        <Icon src={iconBitcoin} />
                        Crypto
                    </Title>
                </BoxRight>
            </RightContainer>

        </Container>
    )
}

export default Content