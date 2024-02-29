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
    const q = "SELECT * FROM ativo where `id`=?;"

    db.query(q, [req.params.id], (erro, data) => {
        if(erro) return res.status(500).json({erro: "Erro ao trazer Ativo por ID"})
        return res.status(200).json(data[0])
    })
}

//Cria o ATIVO
export const createAtivo = async (req: Request, res: Response) => {
    const {wallet_id, nome, valor, quantidade, corretora}= req.body
    if(!nome || !valor || !wallet_id){
        return res.status(400).json({erro: "Campos Obrigatorios!"})
    }

    const q = "INSERT INTO ativo(`wallet_id`, `nome`, `valor`, `quantidade`, `corretora`) values (?,?,?,?,?);"
    db.query(q, [wallet_id, nome, valor, quantidade, corretora], (erro, data) =>{
        if(erro) return res.status(500).json({erro: "Erro ao Cadastrar o Ativo"})
        return res.status(201).json("Cadastrado Ativo!")
    })
}

//Atualiza o ATIVO
export const updateAtivo = async (req: Request, res: Response) => {
    const walletId = req.params.id
    const { nome, valor, quantidade, corretora } = req.body

    // Construir a parte SET dinamicamente com base nos campos fornecidos pelo usuário
    const setFields = []
    if (nome !== undefined) setFields.push("nome=?")
    if (valor !== undefined) setFields.push("valor=?")
    if (quantidade !== undefined) setFields.push("quantidade=?")
    if (corretora !== undefined) setFields.push("corretora=?")

    if (setFields.length === 0) {
        return res.status(400).json({ erro: "Nenhum campo fornecido para atualização" });
    }

    const q = `UPDATE ativo SET ${setFields.join(", ")} WHERE id=?;`

    db.query(q, [...Object.values(req.body).filter(value => value !== undefined), walletId], (erro, data) => {
        if (erro) return res.status(500).json({ erro: "Erro ao Atualizar o Ativo" })
        return res.status(200).json("Ativo Atualizado!")
    })
}

//Excluir o ATIVO
export const deleteAtivo = async (req: Request, res: Response) => {
    const walletId = req.params.id;

    const q = "DELETE FROM ativo WHERE id=?;";

    db.query(q, [walletId], (erro, data) => {
        if (erro) return res.status(500).json({ erro: "Erro ao Excluir o Ativo" });
        return res.status(200).json("Ativo Excluído!");
    });
}