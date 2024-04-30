import express from 'express'
import {createAtivo, deleteAtivo, getAtivoById, getAtivos, updateAtivo, getAtivosByWalletId} from '../controllers/AtivoController'

const router = express.Router()

router.get('/ativos', getAtivos)
router.get('/ativo/:id', getAtivoById)
router.get('/ativosWallet/:id', getAtivosByWalletId)
router.post('/ativo', createAtivo)
router.put('/ativo/:id', updateAtivo)
router.delete('/ativo/:id', deleteAtivo)

export default router