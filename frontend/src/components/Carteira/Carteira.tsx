import React, { useEffect } from "react"
import NavBar from "../Header/NavBar"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Content from "./CarteiraContent"

const Carteira: React.FC = () => {
    const { state } = useLocation()
    const user = state?.user    

    const navigate = useNavigate()

    const redirectToLogin = async () => {
        if (!user || user === null) {
            toast.warning("Faça o login para acessar a página Carteira.")
            await navigate('/login')
        }
      }

    useEffect(() => {
        redirectToLogin()
    }, [user])

    return (
        <div>
            <NavBar user={user}/>
            <Content />
        </div>
    )
}

export default Carteira