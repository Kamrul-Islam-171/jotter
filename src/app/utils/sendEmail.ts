import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async(to:string, html:string) => {
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV==='production', 
    auth: {
      user: 'kamrul.ruet.171@gmail.com',
      pass: 'iotz lqjp owox ycvf',
    },
  });

  
  await transporter.sendMail({
      from: 'kamrul.ruet.171@gmail.com',
      to: to,
      subject: 'Reset Your Password Within 10 min',
      text: 'Please Click the below link : ', // plain‑text body
      html: html, // HTML body
    });
};
