import React from 'react'
import Header from '../Header/Header'
import Main from './Main'
import Cards from './Cards'
import About from './About'

const LandingPage: React.FC = () => {
  return (
    <div>
        <Header />
        <Main />
        <Cards />
        <About />
    </div>
  )
}

export default LandingPage
