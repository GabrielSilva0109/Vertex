import express from 'express'
import cors from 'cors'
import userRoutes from './routes/UserRoutes'

const app = express()
const port = 3333

app.use(express.json())

app.use(cors())

// Rotas principais
app.get('/', (req, res) => {
  res.send('Bem-vindo ao VertexBank!')
})

// Rotas específicas de usuários
app.use('/', userRoutes)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
