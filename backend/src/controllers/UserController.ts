import { Request, Response } from 'express'
import { db } from '../db'
import { error } from 'console'
import bcrypt from 'bcrypt'
import EmailController from './EmailController'
import nodemailer from 'nodemailer';


const generateRandomNumber = () => {
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    return randomNumber.toString();
}

//Retorna todos os Usuarios
export const getUsers = (req: Request, res: Response) => {
    const q = "SELECT * FROM users;"

    db.query(q, (error, data) => {
        if (error) return res.status(500).json({ error: 'Erro interno no servidor' })

        return res.status(200).json(data)
    })
}

//Retorna Usuario Por ID
export const getUserById = (req: Request, res:Response) => {
    const q = "SELECT * FROM users WHERE `id`=?;"

    db.query(q, [req.params.id], (erro, data) =>{
        if(erro) return res.status(500).json({erro: 'Erro ao encontrar Usuario'})

        return res.status(200).json(data[0])
    })
}

// Cria um Usuario
export const createUser = (req: Request, res: Response) => {
    const { name, password, email, birth, cpf, cep } = req.body

    if (!name || !password || !email) {
        return res.status(400).json({ error: 'Campos Obrigatórios!' })
    }

    // Criptografa a senha antes de armazenar
    const hashedPassword = bcrypt.hashSync(password, 10)

    const q = "INSERT INTO users (`name`, `password`,`email`,`birth`, `cpf`, `cep`) VALUES (?,?,?,?,?,?);"
    db.query(q, [name, hashedPassword, email, birth, cpf, cep], (erro, data) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao Cadastrar Usuário' })

        // Recupera o ID do usuário recém-criado
        const userId = data.insertId

        // Gera um número randômico de 5 caracteres para a conta
        const contaNumber = generateRandomNumber()

        // Cria uma wallet para o novo usuário
        const walletQuery = "INSERT INTO wallets (`user_id`, `conta`, `saldo`) VALUES (?,?,?);"
        db.query(walletQuery, [userId, contaNumber, 0.00], async (walletError, walletData) => {
            if (walletError) {
                return res.status(500).json({ error: 'Erro ao Criar Wallet para o Usuário' })
            }

            await sendWelcomeEmail(email)

            return res.status(201).json('Usuário e Wallet Criados!!');
        })
    })
}

//Atualiza os dados do Usuario
export const updateUser = (req: Request, res: Response) => {
    const userId = req.params.id;
    const { name, password, email, birth, cpf, cep, picture } = req.body;

    if (!name && !password && !email && !birth && !cpf && !cep && !picture) {
        return res.status(400).json({ error: 'Nenhum dado de atualização fornecido' });
    }

    const updatedFields: Record<string, any> = {};

    if (name) updatedFields.name = name;
    if (password) {
        const hashedPassword = bcrypt.hashSync(password, 10)
        updatedFields.password = hashedPassword
    }
    if (email) updatedFields.email = email
    if (birth) updatedFields.birth = birth
    if (cpf) updatedFields.cpf = cpf
    if (cep) updatedFields.cep = cep
    if (picture) updatedFields.picture = picture

    const fieldsToUpdate = Object.keys(updatedFields);
    const placeholders = fieldsToUpdate.map((field) => `${field}=?`).join(', ')

    const q = `UPDATE users SET ${placeholders} WHERE id=?`
    const values = [...fieldsToUpdate.map((field) => updatedFields[field]), userId]

    db.query(q, values, (erro, data) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao Atualizar Usuário' })

        return res.status(200).json('Usuário Atualizado!!')
    })
}

//Deleta o Usuario
export const deleteUser = (req: Request, res: Response) => {
    const userId = req.params.id

    const q = "DELETE FROM users WHERE `id`=?"
    db.query(q, [userId], (erro, data) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao Deletar Usuário' })
        return res.status(200).json('Usuário Deletado!!')
    })
}

// Realiza o Login
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { cpf, password } = req.body
        const q = "SELECT * FROM users WHERE cpf=?"
        const result: any[] = await new Promise((resolve, reject) => {
            db.query(q, [cpf], (error, result) => {
                if (error) {
                    console.error('Erro ao buscar usuário no banco de dados:', error)
                    reject(error)
                } else {
                    if (result.length > 0) {
                        const user = result[0]
                        // Compara a senha fornecida com o hash armazenado no banco de dados
                        const passwordMatch = bcrypt.compareSync(password, user.password)

                        if (passwordMatch) {
                            res.status(200).json(user);
                        } else {
                            res.status(401).json({ message: 'Credenciais inválidas pela senha' })
                        }
                    } else {
                        res.status(401).json({ message: 'Credenciais inválidas result' })
                    }
                    resolve(result)
                }
            })
        })
    } catch (error) {
        console.error('Erro ao processar a solicitação de login:', error)
        res.status(500).json({ message: 'Erro interno do servidor' })
    }
}

// Adiciona Foto de Perfil
export const updateUserPicture = (req: Request, res: Response) => {
    const userId = req.params.id;
    const { picture } = req.body;

    if (!picture) {
        return res.status(400).json({ error: 'Nenhuma imagem fornecida' })
    }

    const q = `UPDATE users SET picture=? WHERE id=?`
    const values = [picture, userId]

    db.query(q, values, (erro, data) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao Atualizar Foto do Usuário' })

        return res.status(200).json('Foto do Usuário Atualizada!!')
    })
}

// Cria uma função assíncrona para enviar o e-mail de boas-vindas
const sendWelcomeEmail = async (to: string) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'automacaobrame@gmail.com',
            pass: 'Brame2023@'
        }
    })

    const mailOptions = {
        from: 'automacaobrame@gmail.com',
        to,
        subject: 'Bem-vindo ao Vertex!',
        text: 'Olá! Bem-vindo ao VertexBank! Estamos felizes por ter você como nosso novo usuário.'
    }

    try {
        await transporter.sendMail(mailOptions)
        console.log('E-mail de boas-vindas enviado com sucesso para:', to)
    } catch (error) {
        console.error('Erro ao enviar e-mail de boas-vindas:', error)
    }
}