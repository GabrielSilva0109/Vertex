import express from 'express'
import userRoutes from './routes/UserRoutes'

const app = express()
const port = 3333

app.use(express.json())

// Rotas principais
app.get('/', (req, res) => {
  res.send('Bem-vindo ao VertexBank!')
})

// Rotas específicas de usuários
app.use('/', userRoutes)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
