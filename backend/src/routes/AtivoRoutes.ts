import express from 'express'

import {createAtivo, deleteAtivo, getAtivoById, getAtivos, updateAtivo} from '../controllers/AtivoController'

const router = express.Router()

router.get('/ativos', getAtivos)
router.get('/ativo/:id', getAtivoById)
router.post('/ativo', createAtivo)
router.put('/ativo/:id', updateAtivo)
router.delete('/ativo/:id', deleteAtivo)

export default router