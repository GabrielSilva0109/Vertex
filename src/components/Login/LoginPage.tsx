import React from "react"
import Header from "../Header/Header"
import { Link, useLocation } from 'react-router-dom'
import styled from "styled-components"
import FormLogin from "./FormLogin"

const Btn = styled(Link)`

`
const LoginPage: React.FC = () => {
    const { state } = useLocation()
    const user = state?.user
    
    return (
        <div>
            <Header />
            <FormLogin />
        </div>
    )
}


export default LoginPage