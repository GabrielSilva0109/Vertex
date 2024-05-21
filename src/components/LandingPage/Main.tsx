import React, { ImgHTMLAttributes } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import aws from '../../IMG/awsIcon.png';
import vercel from '../../IMG/vercel.png';
import coinmarket from '../../IMG/coinmarkert.png';
import news from '../../IMG/newsApi.png';
import google from '../../IMG/googleIcon.png';
import vertex from '../../IMG/vertex.png';
import recharts from '../../IMG/recharts.png';
import canva from '../../IMG/canvaIcon.png';
import binance from '../../IMG/binance.png';

interface LogoImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    isNews?: boolean;
    isRecharts?: boolean;
    isBinance?: boolean;
    isVercel?: boolean;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background: #1c1c1e;
    color: white;
    align-items: center;
    padding: 20px;
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1200px;
`

const LeftContainer = styled.div`
    flex: 1;
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

    ${({ isNews }) => isNews && `
        margin-top: -30px;
        width: 120px;

        @media (max-width: 750px) {
            width: 100px;
            margin-top: -25px;
            margin-left:-15px;
        }
    `}

    ${({ isVercel }) => isVercel && `
        margin-top: -30px;
        width: 140px;

        @media (max-width: 750px) {
            width: 120px;
            margin-top: -15px;
            margin-left: -10px;
        }
    `}

    ${({ isRecharts }) => isRecharts && `
        margin-top: -10px;
        width: 140px;

        @media (max-width: 750px) {
            width: 100px;
            margin-top: 0;
            margin-left: -10px
        }
    `}

    ${({ isBinance }) => isBinance && `
        margin-top: -15px;
        width: 150px;

        @media (max-width: 750px) {
            width: 120px;
            margin-top: -5px;
            margin-left:-25px;
        }
    `}
`

const SlideContainer = styled.div`
    width: 100%;
    overflow: hidden;
`

const Slide = styled.div`
    background: #1c1c1e;
    margin: 0;
    padding: 0;
`

const Main: React.FC = () => {
    const logos = [aws, coinmarket, news, google, recharts, canva, binance, vercel];

    const settings = {
        dots: false,
        infinite: true,
        speed: 10000,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                },
            },
        ],
    };

    return (
        <Container>
            <ContentContainer>
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
            </ContentContainer>
            <SlideContainer>
                <Slide>
                    <Slider {...settings}>
                        {logos.map((logo, index) => (
                            <div key={index}>
                                <LogoImage 
                                    src={logo} 
                                    isVercel={logo === vercel} 
                                    isNews={logo === news} 
                                    isRecharts={logo === recharts} 
                                    isBinance={logo === binance}
                                />
                            </div>
                        ))}
                    </Slider>
                </Slide>
            </SlideContainer>
        </Container>
    );
}

export default Main;
