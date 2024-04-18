import express, { Request, Response } from 'express'
import EmailController from '../controllers/EmailController'

const router = express.Router();

router.post('/send-email', async (req: Request, res: Response) => {
  try {
    await EmailController.sendEmail(req, res); // Usando a classe EmailController
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).send('Erro ao enviar e-mail');
  }
});

export default router;
