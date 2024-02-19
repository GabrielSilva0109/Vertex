import express from 'express'

const app = express()
const port = 3333

app.get('/', (req, res) => {
  res.send('Bem-vindo ao VertexBank!')
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
});
