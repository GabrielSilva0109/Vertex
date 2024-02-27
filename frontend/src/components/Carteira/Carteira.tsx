import React, { useEffect } from "react"
import NavBar from "../Header/NavBar"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Carteira: React.FC = () => {
    const { state } = useLocation()
    const user = state?.user    

    const navigate = useNavigate();

    console.log("User:: ",user)

    useEffect(() => {
        
    }, [])

    useEffect(() => {
    
    }, [user])

    return (
        <div>
            <NavBar />
        </div>
    )
}

export default Carteira