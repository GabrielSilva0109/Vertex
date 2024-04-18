const nodemailer = require('nodemailer')

const emailController = {}

emailController.sendEmail = async (req, res) => {
  const { to, subject, text } = req.body

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'silvagabriel0109@gmail.com',
      pass: 'Amora0109@'
    }
  });

  const mailOptions = {
    from: 'seu-email@gmail.com',
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('E-mail enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).send('Erro ao enviar e-mail');
  }
};

module.exports = emailController;
