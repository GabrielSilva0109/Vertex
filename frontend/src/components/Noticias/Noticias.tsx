import React from  'react'
import NavBar from '../Header/NavBar'
import { deflate } from 'zlib'
import NoticiasContent from './NoticiasContent'

const Noticias: React.FC = () => {
    return (
        <>
            <NavBar/>
            <NoticiasContent />
        </>
    )
}

export default Noticias