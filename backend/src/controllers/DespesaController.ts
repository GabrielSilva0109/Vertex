import { localDB } from "../db"
import { Request, Response } from 'express'

// Retorna todos os DESPESAS
export const getDespesas = async (req: Request, res: Response) => {
    const q = "SELECT * FROM despesas;";  
    localDB.query(q, (erro, data) => {
        if (erro) return res.status(500).json({ erro: "Erro ao trazer os Despesas" });
        return res.status(200).json(data);
    });
}

// Retorna DESPESA por ID
export const getDespesaById = async (req: Request, res: Response) => {
    const q = "SELECT * FROM despesas WHERE `id`=?;"

    localDB.query(q, [req.params.id], (erro, data) => {
        if (erro) return res.status(500).json({ erro: "Erro ao trazer Ativo por ID" });
        return res.status(200).json(data[0]);
    });
}

// Retorna DESPESAS por ID da WALLET
export const getDespesasByWalletId = async (req: Request, res: Response) => {
    const q = "SELECT * FROM despesas WHERE `wallet_id`=?"

    localDB.query(q, [req.params.id], (erro, data) => {
        if(erro) return res.status(500).json({erro: "Erro ao trazer as Despesas dessa Wallet"})
        return res.status(200).json(data)
    })
}

// Cria o DESPESA
export const createDespesa = async (req: Request, res: Response) => {
    const { wallet_id, titulo, valor, observacao, categoria, fonte, data } = req.body; 

    if (!titulo || !valor || !wallet_id) {
        return res.status(400).json({ erro: "Campos Obrigatórios!" });
    }

    const q = "INSERT INTO despesas(`wallet_id`, `titulo`, `valor`, `observacao`, `categoria`, `fonte`, `data`) VALUES (?,?,?,?,?,?,?);"
    localDB.query(q, [wallet_id, titulo, valor, observacao, categoria, fonte, data], (erro, data) => {
        if (erro) return res.status(500).json({ erro: "Erro ao Cadastrar a Despesa" });
        return res.status(201).json("Despesa Cadastrada!");
    });
}

// Atualiza o DESPESA
export const updateDespesa = async (req: Request, res: Response) => {
    const despesaId = req.params.id;
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

    const q = `UPDATE despesas SET ${setFields.join(", ")} WHERE id=?;`

    localDB.query(q, [...Object.values(req.body).filter(value => value !== undefined), despesaId], (erro, data) => {
        if (erro) return res.status(500).json({ erro: "Erro ao Atualizar a Despesa" })
        return res.status(200).json("Despesa Atualizada!")
    });
}

// Excluir o ATIVO
export const deleteDespesa = async (req: Request, res: Response) => {
    const despesaId = req.params.id;

    const q = "DELETE FROM despesas WHERE id=?;"

    localDB.query(q, [despesaId], (erro, data) => {
        if (erro) return res.status(500).json({ erro: "Erro ao Excluir o Desesa" });
        return res.status(200).json("Despesa Excluída!");
    });
}
