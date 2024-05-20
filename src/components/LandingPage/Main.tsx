import React, { ImgHTMLAttributes } from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import aws from '../Sections/img/awsIcon.png'
import vercel from '../Sections/img/vercel.png'
import coinmarket from '../Sections/img/coinmarkert.png'
import news from '../Sections/img/newsApi.png'
import google from '../Sections/img/googleIcon.png'
import vertex from '../Sections/img/vertex.png'
import recharts from '../Sections/img/recharts.png'
import canva from '../Sections/img/canvaIcon.png'
import binance from '../Sections/img/binance.png'

interface LogoImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    isNews?: boolean
    isRecharts?: boolean
    isBinance?: boolean
}

const Container = styled.div`
    display: flex;
    background: #1c1c1e;
    color: white;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap; 
    padding: 20px; 
`

const LeftContainer = styled.div`
    flex: 1;
    max-width: 600px; 
    padding: 20px;
`

const TitleMain = styled.h1`
    font-size: 2.8rem;
    text-align: start;

    @media (max-width: 768px) {
       font-size: 1.8rem;
    }
`

const TextMain = styled.p`
    font-size: 1.2rem;
    text-align: start;
    color: gray;
    font-weight: 600;

    span {
        transition: color 0.3s ease;

        &:hover {
            color: #b0ff00; 
        }
    }

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`

const RightContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Image = styled.img`
    width: 100%;
    height: auto;
    max-width: 500px; 
`

const LogoImage = styled.img<LogoImageProps>`
    width: 50px;
    height: auto;
    @media(max-width: 750px){
        width: 40px;
    }

    ${({ isNews }) => isNews && `
        margin-top: -30px;
        margin-left: -30px;
        width: 120px;

        @media(max-width: 750px){
            margin-right: 10px;
        }
    `}

    ${({ isRecharts }) => isRecharts && `
        margin-top: -10px;
        width: 140px;

        @media(max-width: 750px){
            width: 100px;
            margin-right: 10px;
        }
    `}

    ${({ isBinance }) => isBinance && `
        margin-top: -15px;
        margin-left: -30px;
        width: 150px;

        @media(max-width: 750px){
            margin-top: -5px;
            width: 100px;
            margin-right: 10px;
        }
    `}
`

const SlideContainer = styled.div`
    max-width: 100%; 
    height: 70px;
    overflow: hidden;

    @media(max-width: 750px){
        height: auto;
    }
`

const Slide = styled.div`
    background: #1c1c1e;
    margin: 0px;
    padding: 0px;
`

const Main: React.FC = () => {
    const logos = [aws, coinmarket, news, google, recharts, canva, binance, vercel]

    const settings = {
        dots: false,
        infinite: true,
        speed: 10000,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1,
    }

    return (
        <>
            <Container>
                <LeftContainer>
                    <TitleMain>Seu universo financeiro<br /> em um só lugar</TitleMain>
                    <TextMain>
                        <span>Ações</span>, <span>Criptomoedas</span>, <span>ETFs</span>, <span>Renda fixa </span>
                        e muito mais.<br /> Diversifique seu portfólio, maximize seus retornos e <br />
                        acompanhe tudo em tempo real com nossa plataforma.
                    </TextMain>
                </LeftContainer>
                <RightContainer>
                    <Image src={vertex} />
                </RightContainer>
            </Container>
            <SlideContainer> 
                <Slide>
                    <Slider {...settings}>
                        {logos.map((logo, index) => (
                            <div key={index}>
                                 <LogoImage src={logo} isNews={logo === news}  isRecharts={logo === recharts} isBinance={logo === binance}/>
                            </div>
                        ))}
                    </Slider>
                </Slide>
            </SlideContainer>
        </>
    )
}

export default Main