import express from "express"
import { createInvestimento, deleteInvestimento, getInvestimentoById, getInvestimentos, updateInvestimento } from "../controllers/InvestimentoController"


const router = express.Router()

router.get('/investimentos', getInvestimentos)
router.get('/Investimento/:id', getInvestimentoById)
router.post('/Investimento', createInvestimento)
router.put('/investimento/:id', updateInvestimento)
router.delete('/investimento/:id', deleteInvestimento)


export default router