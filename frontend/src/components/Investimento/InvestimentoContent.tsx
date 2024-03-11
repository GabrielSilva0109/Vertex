import React, { useEffect, useState } from 'react';
import { BoxRight, Container, LeftContainer, Main, RightContainer } from '../Carteira/CarteiraContent';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Acoes from './Classes/Acoes';

const MiniBox = styled.div`
  background: black;
  width: 90%;
  padding: 5px;
  border-radius: 15px;
`

const ExpandedBox = styled.div<{ isOpen: boolean }>`
  background: gray;
  width: 95%;
  padding: 5px;
  border-radius: 15px;
  margin-top: 15px;
  height: ${(props) => (props.isOpen ? '500px' : '65px')};
  overflow: hidden;
  transition: height 0.3s;
  display: block;
  align-items: start;
`

const BtnOpen = styled.button`
 
`

const Top = styled.div<{ isOpen: boolean, color: string }>`
  display: flex;
  align-items: ${(props) => (props.isOpen ? 'flex-start' : 'center')};
  justify-content: space-between;
  width: 100%;
  padding-right: 10px;
  margin-top: 10px;
`

const SubTitle = styled.h1<{ borderColor: string }>`
  color: white; 
  border-left: 4px solid ${(props) => props.borderColor};
  padding-left: 10px; 
  margin:0px;
`


const InvestimentoContent: React.FC = () => {
  const { state } = useLocation();
  const user = state?.user;
  const navigate = useNavigate();
  const [saldo, setSaldo] = useState<number>(0);
  const [expandedBoxes, setExpandedBoxes] = useState<{ [key: string]: boolean }>({
    acoes: false,
    cryptomoedas: false,
    moedas: false,
    fundosImobiliarios: false,
    rendaFixa: false,
    poupanca: false,
  });

  const colors = ['#b0ff00', '#005954', '#338b85', '#ffcc00', '#9ce0db', '#4f46e5']

  const toggleExpandedBox = (boxKey: string) => {
    setExpandedBoxes((prevBoxes) => ({
      ...prevBoxes,
      [boxKey]: !prevBoxes[boxKey],
    }));
  };

  const fetchSaldo = async (userId: number) => {
    try {
      const response = await fetch(`http://localhost:3333/walletUser/${userId}`);

      if (!response.ok) {
        console.error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        return;
      }

      const data = await response.json();

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
        <Main>
          <ExpandedBox isOpen={expandedBoxes.acoes}>
            <Top isOpen={expandedBoxes.acoes} color={colors[0]}>
              <SubTitle borderColor="#b0ff00">Ações</SubTitle>
              <BtnOpen onClick={() => toggleExpandedBox('acoes')}>Abrir</BtnOpen>
            </Top>
            {expandedBoxes.acoes && <Acoes />}
          </ExpandedBox>

          <ExpandedBox isOpen={expandedBoxes.cryptomoedas}>
            <Top isOpen={expandedBoxes.cryptomoedas} color={colors[1]}>
              <SubTitle borderColor='#005954'>Cryptomoedas</SubTitle>
              <BtnOpen onClick={() => toggleExpandedBox('cryptomoedas')}>Abrir</BtnOpen>
            </Top>
          </ExpandedBox>

          <ExpandedBox isOpen={expandedBoxes.moedas}>
            <Top isOpen={expandedBoxes.moedas} color={colors[2]}>
              <SubTitle borderColor="#0030bf">Moedas</SubTitle>
              <BtnOpen onClick={() => toggleExpandedBox('moedas')}>Abrir</BtnOpen>
            </Top>
          </ExpandedBox>

          <ExpandedBox isOpen={expandedBoxes.fundosImobiliarios}>
            <Top isOpen={expandedBoxes.fundosImobiliarios} color={colors[3]}>
              <SubTitle borderColor="#ffcc00">Fundos Imobiliários</SubTitle>
              <BtnOpen onClick={() => toggleExpandedBox('fundosImobiliarios')}>Abrir</BtnOpen>
            </Top>
          </ExpandedBox>

          <ExpandedBox isOpen={expandedBoxes.rendaFixa}>
            <Top isOpen={expandedBoxes.rendaFixa} color={colors[4]}>
              <SubTitle borderColor="#9ce0db">Renda Fixa</SubTitle>
              <BtnOpen onClick={() => toggleExpandedBox('rendaFixa')}>Abrir</BtnOpen>
            </Top>
          </ExpandedBox>

          <ExpandedBox isOpen={expandedBoxes.poupanca}>
            <Top isOpen={expandedBoxes.poupanca} color={colors[5]}>
              <SubTitle borderColor="#4f46e5">Poupança</SubTitle>
              <BtnOpen onClick={() => toggleExpandedBox('poupanca')}>Abrir</BtnOpen>
            </Top>
          </ExpandedBox>
        </Main>
      </LeftContainer>

      <RightContainer>
        <BoxRight>
          <MiniBox style={{ marginTop: '15px' }}>
            <h3>Saldo</h3>
            <h3>R${saldo}</h3>
          </MiniBox>
          <MiniBox>
            <h3>Saldo</h3>
            <h3>R${saldo}</h3>
          </MiniBox>
        </BoxRight>
      </RightContainer>
    </Container>
  );
};

export default InvestimentoContent;
