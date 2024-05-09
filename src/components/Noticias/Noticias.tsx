import React, { useEffect } from  'react'
import NavBar from '../Header/NavBar'
import { deflate } from 'zlib'
import NoticiasContent from './NoticiasContent'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'

const Noticias: React.FC = () => {
    const { state } = useLocation()
    const user = state?.user    

    const navigate = useNavigate()

    const redirectToLogin = async () => {
        if (!user || user === null) {
            toast.warning("Faça o login para acessar a página Noticias.")
            await navigate('/login')
        }
      };

    useEffect(() => {
        redirectToLogin()
    }, [user])

    return (
        <>
            <NavBar user={user}/>
            <NoticiasContent />
        </>
    )
}

export default Noticias