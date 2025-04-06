import { sendResetPasswordEmail } from '../services/authService.js';

export const sendResetEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    const result = await sendResetPasswordEmail(email);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
