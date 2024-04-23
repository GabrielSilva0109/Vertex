import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import userRoutes from './routes/UserRoutes'
import walletRoutes from './routes/WalletRoutes'
import ativoRoutes from './routes/AtivoRoutes'
import despesaRoutes from './routes/DespesaRoutes'
import investimentoRoutes from './routes/InvestimentoRoutes'
const { google } = require('googleapis')

dotenv.config()

const app = express()
const port = 3333;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3333/oauth2callback'

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
)

app.use(express.json())
app.use(cors())

app.get('/oauth2callback', async (req, res) => {
  const code = req.query.code as string; //Código de autorização da consulta da URL

  try {
      if (!code) {
          throw new Error('Código de autorização ausente.');
      }

      // Trocar o código de autorização pelo refresh token
      const { tokens } = await oAuth2Client.getToken(code);
      const refreshToken = tokens.refresh_token;

      // Agora você tem o refresh token, você pode usar isso para enviar e-mails
      // Configurações do transporte SMTP
      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              type: 'OAuth2',
              user: 'vertexcash@gmail.com',
              clientId: CLIENT_ID,
              clientSecret: CLIENT_SECRET,
              refreshToken: refreshToken,
          },
      });

      // Obter o destinatário do corpo da solicitação ou de qualquer outra fonte de dados
      let destinatario = 'destinatario@example.com'; // Destinatário padrão
      if (typeof req.query.destinatario === 'string') {
          destinatario = req.query.destinatario;
      }

      // Configurações do e-mail a ser enviado
      const mailOptions = {
          from: 'vertexcash@gmail.com',
          to: destinatario,
          subject: 'Assunto do e-mail',
          text: 'Corpo do e-mail',
      };

      const result = await transporter.sendMail(mailOptions);
      console.log('E-mail enviado:', result);
      res.send('E-mail enviado com sucesso!');
  } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      res.status(500).send('Erro ao enviar e-mail.');
  }
})

// Rotas principais
app.get('/', (req, res) => {
  res.send('Bem-vindo ao VertexBank!')
})

// Rotas específicas de usuários
app.use('/', userRoutes, walletRoutes, ativoRoutes, despesaRoutes, investimentoRoutes)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})