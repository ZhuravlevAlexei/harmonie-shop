import nodemailer, { SendMailOptions } from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEmail = async (options: SendMailOptions) => {
  const res = await transporter.sendMail(options);
  return res;
};
