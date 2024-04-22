import { mailgunConfig } from '../mailGunConfig'
import mailgun from 'mailgun-js'
import { Request, Response } from "express"

const mg = mailgun({apiKey: mailgunConfig.apiKey, domain: mailgunConfig.domain

export const sendEmailWelcome = (recipient: string) => {
    const subject = "Bem-vindo ao Vertex"
    const body = "Olá e bem-vindo ao Vertex! Estamos entusiasmados por tê-lo(a) conosco. Sua experiência é nossa prioridade, e estamos aqui para garantir que seja excepcional. Aproveite ao máximo cada momento aqui!"

    const data = {
        from: 'automacaobrame@gmail.com',
        to: recipient,
        subject: subject,
        text: body
    }

    mg.messages().send(data, (error: any, body: any) => {
        if(error){
            console.error("Erro ao enviar o email!", error)
        } else {
            console.log('Email de Boas vindas enviado !', body)
        }
    })
}
