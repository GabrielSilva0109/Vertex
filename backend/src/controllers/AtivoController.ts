import { db } from "../db"
import { Request, Response } from 'express'

// Retorna todos os ATIVOS
export const getAtivos = async (req: Request, res: Response) => {
    const q = "SELECT * FROM ativos;";  
    db.query(q, (erro, data) => {
        if (erro) return res.status(500).json({ erro: "Erro ao trazer os Ativos" });
        return res.status(200).json(data);
    });
}

// Retorna ATIVO por ID
export const getAtivoById = async (req: Request, res: Response) => {
    const q = "SELECT * FROM ativos WHERE `id`=?;"; 

    db.query(q, [req.params.id], (erro, data) => {
        if (erro) return res.status(500).json({ erro: "Erro ao trazer Ativo por ID" });
        return res.status(200).json(data[0]);
    });
}

// Retorna ATIVOS por ID da WALLET
export const getAtivosByWalletId = async (req: Request, res: Response) => {
    const q = "SELECT * FROM Ativos WHERE `wallet_id`=?"

    db.query(q, [req.params.id], (erro, data) => {
        if(erro) return res.status(500).json({erro: "Erro ao trazer os Ativos dessa Wallet"})
        return res.status(200).json(data)
    })
}

// Cria o ATIVO
export const createAtivo = async (req: Request, res: Response) => {
    const { wallet_id, titulo, valor, observacao, categoria, fonte, data } = req.body; 

    if (!titulo || !valor || !wallet_id) {
        return res.status(400).json({ erro: "Campos Obrigatórios!" });
    }

    const q = "INSERT INTO ativos(`wallet_id`, `titulo`, `valor`, `observacao`, `categoria`, `fonte`, `data`) VALUES (?,?,?,?,?,?,?);";  // Alteração do nome da tabela para 'ativos'
    db.query(q, [wallet_id, titulo, valor, observacao, categoria, fonte, data], (erro, data) => {
        if (erro) return res.status(500).json({ erro: "Erro ao Cadastrar o Ativo" });
        return res.status(201).json("Cadastrado Ativo!");
    });
}

// Atualiza o ATIVO
export const updateAtivo = async (req: Request, res: Response) => {
    const ativoId = req.params.id;
    const { titulo, valor, observacao, categoria, fonte, data } = req.body;  

    // Construir a parte SET dinamicamente com base nos campos fornecidos pelo usuário
    const setFields = [];
    if (titulo !== undefined) setFields.push("titulo=?");
    if (valor !== undefined) setFields.push("valor=?");
    if (observacao !== undefined) setFields.push("observacao=?");
    if (categoria !== undefined) setFields.push("categoria=?");
    if (fonte !== undefined) setFields.push("fonte=?");
    if (data !== undefined) setFields.push("data=?");

    if (setFields.length === 0) {
        return res.status(400).json({ erro: "Nenhum campo fornecido para atualização" })
    }

    const q = `UPDATE ativos SET ${setFields.join(", ")} WHERE id=?;`

    db.query(q, [...Object.values(req.body).filter(value => value !== undefined), ativoId], (erro, data) => {
        if (erro) return res.status(500).json({ erro: "Erro ao Atualizar o Ativo" })
        return res.status(200).json("Ativo Atualizado!")
    });
}

// Excluir o ATIVO
export const deleteAtivo = async (req: Request, res: Response) => {
    const ativoId = req.params.id;

    const q = "DELETE FROM ativos WHERE id=?;";  // Alteração do nome da tabela para 'ativos'

    db.query(q, [ativoId], (erro, data) => {
        if (erro) return res.status(500).json({ erro: "Erro ao Excluir o Ativo" });
        return res.status(200).json("Ativo Excluído!");
    });
}
