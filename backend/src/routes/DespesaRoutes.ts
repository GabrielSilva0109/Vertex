import express from 'express'
import {getDespesas, getDespesaById, createDespesa, updateDespesa, deleteDespesa} from '../controllers/DespesaController'

const router = express.Router()

router.get('/despesas', getDespesas)
router.get('/despesa/:id', getDespesaById)
router.post('/despesa', createDespesa)
router.put('/despesas/:id', updateDespesa)
router.delete('/despesa/:id', updateDespesa)

export default router