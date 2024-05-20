import React from 'react'
import styled from 'styled-components'
import bnb from '../Sections/img/bnb2.svg'
import btc from '../Sections/img/bitcoin.svg'
import cardano from '../Sections/img/cardano.svg'
import eth from '../Sections/img/eth.svg'
import solana from '../Sections/img/solana.png'
import xrp from '../Sections/img/xrp.svg'
import litecoin from '../Sections/img/litecoin.png'
import monero from '../Sections/img/monero.png'
import polkadot from '../Sections/img/polkadot.png'
import uniswap from '../Sections/img/uniswap.png'
import gmx from '../Sections/img/gmx.png'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1c1c1e;
`

const Card = styled.div`
    display: flex;
    background: #b0ff00;
    width: 92%;
    height: 200px;
    padding: 20px;
    margin: 20px;
    border-radius: 8px;

    @media(max-width: 750px){
        flex-direction: column;
        height: auto;
        width: 85%;
    }
`

const CardLeft = styled.div`
    display: flex;
    align-items: start;
    flex-direction: column;
    width: 60%;
    height: 100%;
    justify-content: center;
    padding-left: 30px;

    @media(max-width: 750px){
        width: 100%
    }
`

const CardRight = styled.div`
    display: flex;  
    width: 40%;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    padding: 5px;

    @media(max-width: 750px){
        width: 100%
    }
`

const Title = styled.h2`
    font-size: 1.8rem;
    color: black;
    font-weight: bold;
    margin: 0px;
    padding: 0px;
    display: flex;
    text-align: start;
    border-left: 3px solid white;
    
    @media(max-width: 750px){
        font-size: 1.5rem;
    }
`

const Text = styled.h4`
    font-size: 1.2rem;
    margin: 0px;
    padding: 0px;
    color: #323233;
    @media(max-width: 750px){
        font-size: 1rem;
    }
`

const LogoImage = styled.img`
    width: 70px;
    height: auto;
    border-radius: 50%;

    @media(max-width: 750px){
        width: 50px;
    }
`

const SlideContainer = styled.div`
    max-width: 100%; 
    height: auto;
    overflow: hidden;
`

const Slide = styled.div`
    margin: 0px;
    padding: 0px;
`

const About: React.FC = () => {
    const logos1 = [bnb, btc, cardano, eth, polkadot]
    const logos2 = [solana, xrp, gmx, monero, uniswap]

    const settings1 = {
        dots: false,
        infinite: true,
        speed: 7000,
        slidesToShow: 4,
        slidesToScroll: 1, 
        autoplay: true,
        autoplaySpeed: 3000, 
    }

    const settings2 = {
        dots: false,
        infinite: true,
        speed: 7000, 
        slidesToShow: 4,
        slidesToScroll: 1, 
        autoplay: true,
        autoplaySpeed: -3000,
    }

    return (
        <Container>
            <Card>
                <CardLeft>
                    <Title>&nbsp;Acompanhe suas Criptomoedas</Title>
                    <Text>&nbsp;&nbsp;Aproveite a integração com as principais criptomoedas <br/> &nbsp;&nbsp;do mercado em tempo real.</Text>
                </CardLeft>
                <CardRight>
                    <SlideContainer>
                        <Slide>
                            <Slider {...settings1}>
                                {logos1.map((logo, index) => (
                                    <div key={index}>
                                        <LogoImage src={logo} alt={`logo-${index}`} />
                                    </div>
                                ))}
                            </Slider>
                        </Slide>
                        <Slide>
                            <Slider {...settings2}>
                                {logos2.map((logo, index) => (
                                    <div key={index}>
                                        <LogoImage src={logo} alt={`logo-${index}`} />
                                    </div>
                                ))}
                            </Slider>
                        </Slide>
                    </SlideContainer>
                </CardRight>
            </Card>
        </Container>
    )
}

export default About