import express from 'express'
import { createWallet, deleteWallet, getWalletById, getWallets, updateWallet, getWalletByIdUser } from '../controllers/WalletController'

const router = express.Router()

router.get('/wallets', getWallets)
router.get('/wallet/:id', getWalletById)
router.get('/walletUser/:id', getWalletByIdUser)
router.post('/wallet', createWallet)
router.put('/wallet/:id', updateWallet)
router.delete('/wallet/:id', deleteWallet)

export default router