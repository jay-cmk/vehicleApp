import nodemailer from 'nodemailer'

export const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_MAIL,
    to: to,         // use 'to' from function params
    subject: subject,
    html: html,     // use 'html' from function params
  });
};
