// emailService.ts
import { mailgunConfig } from '../mailGunConfig'
import mailgun from 'mailgun-js'
import { Request, Response } from "express"

const mg = mailgun({apiKey: mailgunConfig.apiKey, domain: mailgunConfig.domain});

export const enviarEmail = (destinatario: string, assunto: string, corpo: string) => {
    const data = {
        from: 'silvagabriel0109@gmail.com',
        to: destinatario,
        subject: assunto,
        text: corpo
    };

    mg.messages().send(data, (error: any, body: any) => {
        if (error) {
            console.error('Erro ao enviar email:', error);
        } else {
            console.log('Email enviado com sucesso:', body);
        }
    });
};
