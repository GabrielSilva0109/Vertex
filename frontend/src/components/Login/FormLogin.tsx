import React, { useState } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
    height: 87.9vh;
    width: 100%;
    background:black;
    display: flex;
    justify-content:center;
    align-items: center;
    color: white;
`

const Box = styled.div`
    width: 350px;
    min-height: 400px;
    background: #2C2C2E;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 10px;
    gap:10px;
    margin: 10px;
`

export const Input = styled.input`
    background-color: #e1e1e1;
    color: black;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 16px;
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid #b0ff00;
    outline: none;
    transition: all 0.3s ease-in-out;

    &:hover {
        background-color: #f1f1f1;
        border-color: #667788;
    }

    &:focus {
        background-color: #272727;
        border-color: #b0ff00;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }

    &.invalid {
        border-color: #ff0000;
        background-color: #f00;
    }

    /* Animações */
    &.entering {
        animation: slide-in 0.3s ease-in-out forwards;
    }
`

const BtnLogin = styled.button`
    background: #b0ff00;
    padding: 12px;
    border-radius: 20px;
    color: black;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        transform: scale(1.025);
        background: #d3fd74;
    }
      
    &:active {
        transform: scale(0.975);
    }
`

const BtnCadastro = styled.button`
    background: white;
    padding: 12px;
    border-radius: 20px;
    color: black;
    font-size: .975rem;
    line-height: 1.25rem;
    font-weight: bold;
    border: none;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        transform: scale(1.025);
        background: #dfdfdf;
    }
      
    &:active {
        transform: scale(0.975);
    }
  
`

const BtnGoogle = styled.button`
    display: flex;
    padding: 10px;
    font-size: 0.975rem;
    line-height: 1.25rem;
    font-weight: bold;
    text-align: center;
    justify-content: center;
    font-family: "Montserrat", sans-serif;
    vertical-align: middle;
    align-items: center;
    border-radius: 20px;
    border: none;
    gap: 0.75rem;
    color: black;
    background-color: #19242b;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0, 0.87, 0.12, 1);
    
    &:hover {
      transform: scale(1.025);
    }
    
    &:active {
      transform: scale(0.975);
    }

    svg {
      height: 24px;
      width: auto;
    }
`

const FormCadastro: React.FC<{ onBackToLogin: () => void }> = ({ onBackToLogin }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        cpf: '',
        password: '',
    })

    const [registrationStatus, setRegistrationStatus] = useState<string | null>(null)

    const formatCPF = (value: string) => {
        const onlyNumbers = value.replace(/[^\d]/g, '')
        const formattedCPF = onlyNumbers.replace(
            /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
            '$1.$2.$3-$4'
        )
        return formattedCPF
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const formattedValue = name === 'cpf' ? formatCPF(value) : value

        setFormData((prevData) => ({
            ...prevData,
            [name]: formattedValue,
        }))
    }

    const handleCadastroClick = async () => {
        try {    
            const response = await fetch('http://localhost:3333/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
    
            if (response.ok) {
                toast.success('Cadastro realizado com sucesso!')
                toast.success('Faça o Login!')
                onBackToLogin()
            } else {
                const responseBody = await response.text()
                toast.error(`Erro: Campos obrigatorios!`)
            }
        } catch (error) {
            toast.error('Erro ao processar a requisição')
        }
    }

   
    return (
        <Box>
            <h1>Cadastro</h1>
            <Input placeholder='Nome' type="text" name='name' value={formData.name} onChange={handleInputChange} />
            <Input placeholder='Email' type="text" name='email' value={formData.email} onChange={handleInputChange}/>
            <Input placeholder='CPF' type="text" name='cpf' value={formData.cpf} onChange={handleInputChange}/>
            <Input placeholder='Senha' type="password" name='password' value={formData.password} onChange={handleInputChange}/>
            <BtnCadastro onClick={handleCadastroClick}>Cadastrar</BtnCadastro>
            <BtnLogin onClick={onBackToLogin}>Login</BtnLogin>
            {registrationStatus && <p>{registrationStatus}</p>}
        </Box>
    )
}

const FormLogin: React.FC = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState<any>(null)
    const [isLoginForm, setIsLoginForm] = useState(true)
    const [loginData, setLoginData] = useState({cpf: '', password: ''})
    
    const toggleForm = () => {
        setIsLoginForm(!isLoginForm);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const formattedValue = name === 'cpf' ? formatCPF(value) : value
        setLoginData((prevData) => ({
            ...prevData,
            [name]: formattedValue,
        }))
    }

    const handleLoginClick = async () => {
        try {
            const response = await fetch('http://localhost:3333/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            })
    
            if (response.ok) {
                const userData = await response.json()
    
                if (userData) {
                    navigate('/home', { state: { user: userData } })
                } else {
                    toast.error('Erro ao obter informações do usuário após o login')
                }
            } else {
                const responseBody = await response.text()
                console.error('Erro na requisição:', responseBody)
                toast.error(`Erro ao Logar`)
            }
        } catch (error) {
            console.error('Erro ao processar a requisição:', error)
            toast.error('Erro ao processar a requisição')
        }
    }

    return (
        <Container>
            {isLoginForm ? (
                <Box>
                    <h1>Login</h1>
                    <Input placeholder='CPF' type="text" name='cpf' value={loginData.cpf} onChange={handleInputChange}/>
                    <Input placeholder='Senha' type="password" name='password' value={loginData.password} onChange={handleInputChange}/>
                    <BtnLogin onClick={handleLoginClick}>Login</BtnLogin>
                    <BtnCadastro onClick={toggleForm}>Cadastrar</BtnCadastro>
                    <BtnGoogle>
                        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262">
                        <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                        <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                        <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
                        <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                        </svg>
                        Continue com Google
                    </BtnGoogle>
                </Box>
            ) : (
                <FormCadastro onBackToLogin={toggleForm} />
            )}
        </Container>
    )
}

export default FormLogin

function formatCPF(value: string) {
    const onlyNumbers = value.replace(/[^\d]/g, '')
    const formattedCPF = onlyNumbers.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
    return formattedCPF
}