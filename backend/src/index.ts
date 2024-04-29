import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import userRoutes from './routes/UserRoutes'
import walletRoutes from './routes/WalletRoutes'
import ativoRoutes from './routes/AtivoRoutes'
import despesaRoutes from './routes/DespesaRoutes'
import investimentoRoutes from './routes/InvestimentoRoutes'
import awsRoutes from './routes/awsRoutes'

dotenv.config()

const app = express()
const port = 3333

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = 'http://localhost:3333/oauth2callback'

app.use(cors())
app.use(express.json())

// Rotas principais
app.get('/', (req, res) => {
  res.send('Bem-vindo ao VertexBank!')
})

// Rotas específicas do LOCALHOST
app.use('/', userRoutes, walletRoutes, ativoRoutes, despesaRoutes, investimentoRoutes)

// Rotas AWS Cloud
app.use('/api', awsRoutes)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})