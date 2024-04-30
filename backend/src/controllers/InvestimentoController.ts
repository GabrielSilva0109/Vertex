import { localDB, awsDB } from "../db"
import { Request, Response } from 'express'

// Retorna todos os Investimentos
export const getInvestimentos = async (req: Request, res: Response) => {
    const q = "SELECT * FROM investimentos;"  
    awsDB.query(q, (erro, data) => {
        if (erro) return res.status(500).json({ erro: "Erro ao trazer os Investimentos" })
        return res.status(200).json(data)
    })
}

// Retorna Investimento por ID
export const getInvestimentoById = async (req: Request, res: Response) => {
    const q = "SELECT * FROM investimentos WHERE `id`=?;"

    awsDB.query(q, [req.params.id], (erro, data) => {
        if (erro) return res.status(500).json({ erro: "Erro ao trazer Ativo por ID" })
        return res.status(200).json(data[0])
    })
}

// Retorna Investimento por ID da WALLET
export const getInvestimentoByWalletId = async (req: Request, res: Response) => {
    const q = "SELECT * FROM investimentos WHERE `wallet_id`=?"

    awsDB.query(q, [req.params.id], (erro, data) => {
        if(erro) return res.status(500).json({erro: "Erro ao trazer os Investimentos dessa Wallet"})
        return res.status(200).json(data)
    })
}

// Cria o Investimento
export const createInvestimento = async (req: Request, res: Response) => {
    const { wallet_id, titulo, valor, observacao, quantidade, categoria, data } = req.body

    if (!titulo || !valor || !wallet_id) {
        return res.status(400).json({ erro: "Campos Obrigatórios!" })
    }

    const q = "INSERT INTO investimentos(`wallet_id`, `titulo`, `valor`, `observacao`, `quantidade`, `categoria`, `data`) VALUES (?,?,?,?,?,?,?);"
    awsDB.query(q, [wallet_id, titulo, valor, observacao, quantidade, categoria, data], (erro, data) => {
        if (erro) return res.status(500).json({ erro: "Erro ao Cadastrar o Investimento" })
        return res.status(201).json("Investimento Cadastrado!")
    })
}

// Atualiza o Investimento 
export const updateInvestimento = async (req: Request, res: Response) => {
    const ativoId = req.params.id
    const { titulo, valor, observacao, quantidade, categoria, data } = req.body

    // Construir a parte SET dinamicamente com base nos campos fornecidos pelo usuário
    const setFields = []
    if (titulo !== undefined) setFields.push("titulo=?")
    if (valor !== undefined) setFields.push("valor=?")
    if (observacao !== undefined) setFields.push("observacao=?")
    if (quantidade !== undefined) setFields.push("quantidade=?")
    if (categoria !== undefined) setFields.push("categoria=?")
    if (data !== undefined) setFields.push("data=?")

    if (setFields.length === 0) {
        return res.status(400).json({ erro: "Nenhum campo fornecido para atualização" })
    }

    const q = `UPDATE investimentos SET ${setFields.join(", ")} WHERE id=?;`

    awsDB.query(q, [...Object.values(req.body).filter(value => value !== undefined), ativoId], (erro, data) => {
        if (erro) return res.status(500).json({ erro: "Erro ao Atualizar o Investimento" })
        return res.status(200).json("Investimento Atualizado!")
    })
}

// Excluir o Investimento
export const deleteInvestimento = async (req: Request, res: Response) => {
    const ativoId = req.params.id

    const q = "DELETE FROM investimentos WHERE id=?;"

    awsDB.query(q, [ativoId], (erro, data) => {
        if (erro) return res.status(500).json({ erro: "Erro ao Excluir o Investimento " })
        return res.status(200).json("Investimento Excluído!")
    })
}