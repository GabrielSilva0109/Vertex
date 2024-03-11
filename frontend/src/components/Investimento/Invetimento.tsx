import React, { useEffect } from  'react'
import NavBar from '../Header/NavBar'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'


const Investimento: React.FC = () => {

    const { state } = useLocation()
    const user = state?.user    

    const navigate = useNavigate()

    const redirectToLogin = async () => {
        if (!user || user === null) {
            toast.warning("Faça o login para acessar a página Investimentos.")
            await navigate('/login')
        }
      };

    useEffect(() => {
        redirectToLogin()
    }, [user])

    return (
        <div>
            <NavBar user={user}/>
            <InvestimentoContent />
        </div>
    )
}

export default Investimento