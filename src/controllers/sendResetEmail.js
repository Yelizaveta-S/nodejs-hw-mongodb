import { sendResetPasswordEmail } from '../services/authService.js'; // Импортируем сервис

export const sendResetEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Используем сервис для отправки email
    const result = await sendResetPasswordEmail(email);

    // Ответ с результатом
    res.status(200).json(result);
  } catch (err) {
    // В случае ошибки передаем в next
    next(err);
  }
};
