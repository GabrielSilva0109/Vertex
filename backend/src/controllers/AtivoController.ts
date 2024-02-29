import { db } from "../db"
import { Request, Response, response } from 'express'

//Retorna todos os ATIVOS
export const getAtivos = async (req: Request, res: Response) => {
    const q = "SELECT * FROM ativo;"
    db.query(q, (erro, data) => {
        if(erro) return res.status(500).json({erro:"Erro ao trazer os Ativos"})
        return res.status(200).json(data)
    })
}

//Retorna ATIVO por ID
export const getAtivoById = async (req: Request, res: Response) => {
    const q = "SELECT * FROM Ativo where `id`=?;"

    db.query(q, [req.params.id], (erro, data) => {
        if(erro) return res.status(500).json({erro: "Erro ao trazer Ativo por ID"})
        return res.status(200).json(data[0])
    })
}

export const createAtivo = async () => {

}

export const updateAtivo = async () => {

}

export const deleteAtivo = async () => {

}