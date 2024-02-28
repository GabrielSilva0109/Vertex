import express from 'express'
import { createWallet, deleteWallet, getWalletById, getWallets, updateWallet, getWalletByIdUser } from '../controllers/WalletController'
import axios from 'axios'

const router = express.Router()

router.get('/wallets', getWallets)
router.get('/wallet/:id', getWalletById)
router.get('/walletUser/:id', getWalletByIdUser)
router.post('/wallet', createWallet)
router.put('/wallet/:id', updateWallet)
router.delete('/wallet/:id', deleteWallet)


router.get('/acoesBrasileiras', async (req, res) => {
    try {
      const response = await axios.get('https://query1.finance.yahoo.com/v7/finance/quote', {
        params: {
          symbol: 'PETR4.SA',
        },
      });
  
      res.json(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados das ações brasileiras:');
      res.status(500).json({ error: 'Erro ao buscar dados das ações brasileiras' });
    }
  })

export default router