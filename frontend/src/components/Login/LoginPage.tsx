import React from "react";
import Header from "../Header/Header";
import { Link } from 'react-router-dom'
import styled from "styled-components";
import FormLogin from "./FormLogin";

const Btn = styled(Link)`

`
const LoginPage: React.FC = () => {
    return (
        <div>
            <Header />
            <FormLogin />
        </div>
    )
}


export default LoginPage