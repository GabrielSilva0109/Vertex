import React from 'react'
import Header from '../Header/Header'
import Main from './Main'
import Cards from './Cards'
import About from './About'
import Grafico from './Grafico'
import Footer from '../Footer/Footer'

const LandingPage: React.FC = () => {
  return (
    <div>
        <Header />
        <Main />
        <Cards />
        <About />
        <Grafico />
        <Footer />
    </div>
  )
}

export default LandingPage
