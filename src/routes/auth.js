import express from 'express';
import { register, login, refresh, logout } from '../controllers/auth.js';
import { validateRegister } from '../validation/auth.js';
import { sendResetEmail } from '../controllers/sendResetEmail.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  validateLogin,
  emailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import { resetPassword } from '../controllers/resetPassword.js';

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.post('/send-reset-email', validateBody(emailSchema), sendResetEmail);
router.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  resetPassword,
);

export default router;
