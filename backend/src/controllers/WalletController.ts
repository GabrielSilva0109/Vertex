import { Request, Response } from 'express'
import { localDB, awsDB } from '../db'
import { error } from 'console'

//Retorna todos os Wallets
export const getWallets = (req: Request, res: Response) => {
    const q = "SELECT * FROM wallets;"

    awsDB.query(q, (error, data) => {
        if (error) return res.status(500).json({ error: 'Erro interno no servidor' })

        return res.status(200).json(data)
    })
}

//Retorna Wallet Por ID
export const getWalletById = (req: Request, res:Response) => {
    const q = "SELECT * FROM wallets WHERE `id`=?;"

    awsDB.query(q, [req.params.id], (erro, data) =>{
        if(erro) return res.status(500).json({erro: 'Erro ao encontrar Wallet'})

        return res.status(200).json(data[0])
    })
}

export const getWalletByIdUser = (req: Request, res: Response) => {
    const q = "SELECT * FROM wallets WHERE `user_id`=?;"

    awsDB.query(q, [req.params.id], (erro, data) => {
        if(erro) return res.status(500).json({erro: 'Erro ao encontrar a Wallet do Usuario'})

        return res.status(200).json(data[0])
    })
}

//Cria uma Wallet   
export const createWallet = (req: Request, res: Response) => {
    const { user_id, conta, saldo, ativos, despesas } = req.body

    if (!user_id || !conta) {
        return res.status(400).json({ error: 'Atributos Obrigatórios!' })
    }

    const q = "INSERT INTO wallets (`user_id`, `conta`,`saldo`, `ativos`, `despesas`) VALUES (?,?,?,?,?);"
    awsDB.query(q, [user_id, conta, saldo, ativos, despesas], (erro, data) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao Criar Wallet' })

        return res.status(201).json('Wallet Criado!!')
    })
}

// Atualiza os dados da Wallet de forma dinâmica
export const updateWallet = (req: Request, res: Response) => {
    const walletId = req.params.id
    const { saldo, ativos, despesas } = req.body

    // Constrói a query de atualização de acordo com os campos fornecidos no corpo da requisição
    let updateFields = []
    let queryParams = []

    if (saldo !== undefined) {
        updateFields.push('saldo=?')
        queryParams.push(saldo)
    }

    if (ativos !== undefined) {
        updateFields.push('ativos=?')
        queryParams.push(ativos)
    }

    if (despesas !== undefined) {
        updateFields.push('despesas=?')
        queryParams.push(despesas);
    }

    if (updateFields.length === 0) {
        return res.status(400).json({ error: 'Nenhum campo fornecido para atualização.' })
    }

    const updateQuery = `UPDATE wallets SET ${updateFields.join(', ')} WHERE id=?`

    awsDB.query(updateQuery, [...queryParams, walletId], (error, data) => {
        if (error) {
            return res.status(500).json({ error: 'Erro ao atualizar os dados da Wallet.' })
        }

        return res.status(200).json('Dados da Wallet Atualizados!')
    })
}

//Deleta a Wallet
export const deleteWallet = (req: Request, res: Response) => {
    const walletId = req.params.id

    const q = "DELETE FROM wallets WHERE `id`=?"
    awsDB.query(q, [walletId], (error, data) => {
        if (error) return res.status(500).json({ error: 'Erro ao Deletar Wallet' })
        return res.status(200).json('Wallet Deletada!!')
    })
}