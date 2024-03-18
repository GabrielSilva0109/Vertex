import express from "express"
import { createInvestimento, deleteInvestimento, getInvestimentoById, getInvestimentoByWalletId, getInvestimentos, updateInvestimento } from "../controllers/InvestimentoController"

const router = express.Router()

router.get('/investimentos', getInvestimentos)
router.get('/investimento/:id', getInvestimentoById)
router.get('/walletInvestimentos/:id', getInvestimentoByWalletId)
router.post('/investimento', createInvestimento)
router.put('/investimento/:id', updateInvestimento)
router.delete('/investimento/:id', deleteInvestimento)

export default router