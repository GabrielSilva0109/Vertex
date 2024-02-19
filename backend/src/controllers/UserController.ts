import { Request, Response } from 'express'
import { db } from '../db'

//Retorna todos os Usuarios
export const getUsers = (req: Request, res: Response) => {
    const q = "SELECT * FROM users;"

    db.query(q, (error, data) => {
        if (error) return res.status(500).json({ error: 'Erro interno no servidor' })

        return res.status(200).json(data)
    })
}

export const getUserById = (req: Request, res:Response) => {
    const q = "SELECT * FROM users WHERE `id`=?;"

    db.query(q, [req.params.id], (erro, data) =>{
        if(erro) return res.status(500).json({erro: 'Erro ao encontrar Usuario'})

        return res.status(200).json(data[0])
    })
}

export const createUser = (req: Request, Res:Response) =>{

}

export const updateUser = (req: Request, Res:Response) =>{
    
}

export const deleteUser = (req: Request, Res:Response) =>{
    
}


