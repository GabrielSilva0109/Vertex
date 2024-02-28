import express from 'express'

import {createAtivo, getAtivos} from '../controllers/AtivoController'

const router = express.Router()

router.get('/ativos', getAtivos)
router.post('/ativo', createAtivo)