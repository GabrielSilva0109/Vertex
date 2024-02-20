import React from 'react'
import Header from '../Header/Header'
import Main from '../MainContent/Main'
import Cards from '../Sections/Cards'
import About from '../Sections/About'

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
