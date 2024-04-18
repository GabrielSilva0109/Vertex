import { Request, Response } from 'express'
import nodemailer from 'nodemailer'

class EmailController {
  async sendEmail(req: Request, res: Response) {
    const { to, subject, text } = req.body;

    // Configuração do transporte do Nodemailer
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'automacaobrame@gmail.com', 
        pass: 'Brame2023@'
      }
    });

    
    const mailOptions = {
      from: 'automacaobrame@gmail.com', 
      to,
      subject,
      text
    };

    try {
      // Envio do e-mail
      await transporter.sendMail(mailOptions);
      res.status(200).send('E-mail enviado com sucesso!')
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error)
      res.status(500).send('Erro ao enviar e-mail')
    }
  }
}

export default new EmailController();
