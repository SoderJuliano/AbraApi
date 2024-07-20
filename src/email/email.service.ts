/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    async sendHtmlEmail(email: string, subject: string, htmlContent: string) {
        try {
            // Configuração do Nodemailer
            const transporter = nodemailer.createTransport({
                // Configurações do seu serviço de email (como Gmail, Outlook, etc.)
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });
            // Opções do email with HTML content
            const mailOptions = {
                from: 'abra.api.top@gmail.com',
                to: email,
                subject: subject,
                html: htmlContent,
            };
            // Enviar o email
            await transporter.sendMail(mailOptions);
            Logger.log('HTML Email sent successfully');
        } catch (error) {
            Logger.error('Failed to send HTML email:', error);
        }
    }

    async sendEmail(email: string, message: string, subject: string) {
        Logger.log(`Sending email to ${email} with subject: ${subject} and message: ${message}`);
        try {
            // Configuração do Nodemailer
            const transporter = nodemailer.createTransport({
                // Configurações do seu serviço de email (como Gmail, Outlook, etc.)
                service: 'Gmail',
                auth: {
                    user: 'abra.api.top@gmail.com',
                    pass: 'hfni rsxa foqs mliq',
                },
            });

            // Opções do email
            const mailOptions = {
                from: 'abra.api.top@gmail.com',
                to: email,
                subject: subject,
                text: message,
            };

            // Enviar o email
            const info = await transporter.sendMail(mailOptions);

            Logger.log(`Email sent: ${info.messageId}`);
        } catch (error) {
            Logger.error(`Failed to send email: ${error.message}`);
        }
    }
}