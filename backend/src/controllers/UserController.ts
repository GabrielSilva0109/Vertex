import { Request, Response } from 'express'
import { db } from '../db'
import { error } from 'console'
import bcrypt from 'bcrypt'

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

//Cria um Usuario   
export const createUser = (req: Request, res: Response) => {
    const { name, password, email, birth, cpf, estado, cidade } = req.body;

    if (!name || !password || !email) {
        return res.status(400).json({ error: 'Campos Obrigatórios!' });
    }

    // Criptografa a senha antes de armazenar
    const hashedPassword = bcrypt.hashSync(password, 10);

    const q = "INSERT INTO users (`name`, `password`,`email`,`birth`, `cpf`, `estado`, `cidade`) VALUES (?,?,?,?,?,?,?);";
    db.query(q, [name, hashedPassword, email, birth, cpf, estado, cidade], (erro, data) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao Cadastrar Usuário' });

        return res.status(201).json('Usuário Criado!!');
    });
}

//Atualiza os dados do Usuario
export const updateUser = (req: Request, res: Response) => {
    const userId = req.params.id;
    const { name, password, email, birth, cpf, estado, cidade } = req.body;

    if (!name && !password && !email && !birth && !cpf && !estado && !cidade) {
        return res.status(400).json({ error: 'Nenhum dado de atualização fornecido' });
    }

    const updatedFields: Record<string, any> = {};

    if (name) updatedFields.name = name;
    if (password) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        updatedFields.password = hashedPassword;
    }
    if (email) updatedFields.email = email;
    if (birth) updatedFields.birth = birth;
    if (cpf) updatedFields.cpf = cpf;
    if (estado) updatedFields.estado = estado;
    if (cidade) updatedFields.cidade = cidade;

    const fieldsToUpdate = Object.keys(updatedFields);
    const placeholders = fieldsToUpdate.map((field) => `${field}=?`).join(', ');

    const q = `UPDATE users SET ${placeholders} WHERE id=?`;
    const values = [...fieldsToUpdate.map((field) => updatedFields[field]), userId];

    db.query(q, values, (erro, data) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao Atualizar Usuário' });

        return res.status(200).json('Usuário Atualizado!!');
    });
}

//Deleta o Usuario
export const deleteUser = (req: Request, res: Response) => {
    const userId = req.params.id;

    const q = "DELETE FROM users WHERE `id`=?";
    db.query(q, [userId], (erro, data) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao Deletar Usuário' });

        return res.status(200).json('Usuário Deletado!!');
    });
}