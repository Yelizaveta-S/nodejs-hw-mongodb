import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import httpErrors from 'http-errors';
import { User } from '../models/user.js';
import { getEnvVar } from '../utils/getEnvVar.js';

export const sendResetPasswordEmail = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw httpErrors(404, 'User not found!');
  }

  const secret = getEnvVar('JWT_SECRET');
  const token = jwt.sign({ email: user.email }, secret, { expiresIn: '5m' });

  const resetLink = `${getEnvVar('APP_DOMAIN')}/reset-password?token=${token}`;

  const transporter = nodemailer.createTransport({
    host: getEnvVar('SMTP_HOST'),
    port: Number(getEnvVar('SMTP_PORT')),
    secure: false,
    auth: {
      user: getEnvVar('SMTP_USER'),
      pass: getEnvVar('SMTP_PASSWORD'),
    },
  });


  const mailOptions = {
    from: getEnvVar('SMTP_FROM'),
    to: email,
    subject: 'Password Reset Request',
    html: `
      <p>To reset your password, click the link below:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>The link will expire in 5 minutes.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch {
    throw httpErrors(500, 'Failed to send the email, please try again later.');
  }

  return {
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  };
};
