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
        background: #d3fd74;
    }
`

const BtnCadastro = styled.button`
    background: white;
    padding: 12px;
    border-radius: 20px;
    color: black;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        background: #dfdfdf;
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
    );
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
                    // Redirecionar para a página home com as informações do usuário
                    navigate('/home', { state: { user: userData } })
                } else {
                    toast.error('Erro ao obter informações do usuário após o login')
                }
            } else {
                const responseBody = await response.text();
                console.error('Erro na requisição:', responseBody);
                toast.error(`Erro ao Logar`);
            }
        } catch (error) {
            console.error('Erro ao processar a requisição:', error);
            toast.error('Erro ao processar a requisição');
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
                </Box>
            ) : (
                <FormCadastro onBackToLogin={toggleForm} />
            )}
        </Container>
    )
}

export default FormLogin

function formatCPF(value: string) {
    const onlyNumbers = value.replace(/[^\d]/g, '');
    const formattedCPF = onlyNumbers.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
    return formattedCPF;
}