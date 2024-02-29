import { Request, Response } from 'express'
import { db } from '../db'
import { error } from 'console'

//Retorna todos os Wallets
export const getWallets = (req: Request, res: Response) => {
    const q = "SELECT * FROM wallets;"

    db.query(q, (error, data) => {
        if (error) return res.status(500).json({ error: 'Erro interno no servidor' })

        return res.status(200).json(data)
    })
}

//Retorna Wallet Por ID
export const getWalletById = (req: Request, res:Response) => {
    const q = "SELECT * FROM wallets WHERE `id`=?;"

    db.query(q, [req.params.id], (erro, data) =>{
        if(erro) return res.status(500).json({erro: 'Erro ao encontrar Wallet'})

        return res.status(200).json(data[0])
    })
}

export const getWalletByIdUser = (req: Request, res: Response) => {
    const q = "SELECT * FROM wallets WHERE `user_id`=?;"

    db.query(q, [req.params.id], (erro, data) => {
        if(erro) return res.status(500).json({erro: 'Erro ao encontrar a Wallet do Usuario'})

        return res.status(200).json(data[0])
    })
}

//Cria uma Wallet   
export const createWallet = (req: Request, res: Response) => {
    const { user_id, conta, saldo } = req.body;

    if (!user_id || !conta) {
        return res.status(400).json({ error: 'Atributos Obrigatórios!' })
    }


    const q = "INSERT INTO wallets (`user_id`, `conta`,`saldo`) VALUES (?,?,?);";
    db.query(q, [user_id, conta, saldo], (erro, data) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao Criar Wallet' });

        return res.status(201).json('Wallet Criado!!');
    });
}

//Atualiza os dados da Wallet
export const updateWallet = (req: Request, res: Response) => {
    const walletId = req.params.id;
    const { saldo } = req.body;

    if (!saldo) {
        return res.status(400).json({ error: 'Nenhum valor de atualização fornecido' });
    }

    const q = 'UPDATE wallets SET saldo=? WHERE id=?'

    db.query(q, [saldo, walletId], (error, data) => {
        if (error) return res.status(500).json('Erro ao atualizar o saldo!');
        
        return res.status(200).json('Saldo Atualizado!');
    })
}

//Deleta a Wallet
export const deleteWallet = (req: Request, res: Response) => {
    const walletId = req.params.id;

    const q = "DELETE FROM wallets WHERE `id`=?";
    db.query(q, [walletId], (error, data) => {
        if (error) return res.status(500).json({ error: 'Erro ao Deletar Wallet' });

        return res.status(200).json('Wallet Deletada!!');
    });
}