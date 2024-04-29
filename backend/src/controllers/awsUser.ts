import { awsDB } from "../db"
import { Request, Response } from 'express'

export const getUsers = (req: Request, res: Response) => {
    const q = "SELECT * FROM users;"

    awsDB.query(q, (error, data) => {
        if (error) return res.status(500).json({ error: 'Erro Externo no Servidor AWS' })

        return res.status(200).json(data)
    })
}