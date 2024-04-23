const { google } = require('googleapis');
const nodemailer = require('nodemailer');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

async function sendMail() {
    try {
        // Obtendo o refresh token durante o processo de autorização OAuth2
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline', 
            scope: 'https://mail.google.com/',
        });
        console.log('Autorize este aplicativo acessando esta URL:', authUrl)

        // Configurações do transporte SMTP
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'vertexcash@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: 'refresh_token_obtido',
            },
        });

        // Configurações do e-mail a ser enviado
        const mailOptions = {
            from: 'vertexcash@gmail.com',
            to: 'destinatario@example.com',
            subject: 'Assunto do e-mail',
            text: 'Corpo do e-mail',
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('E-mail enviado:', result);
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
    }
}

sendMail()