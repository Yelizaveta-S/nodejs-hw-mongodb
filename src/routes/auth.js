import express from 'express';
import { register, login, refresh, logout } from '../controllers/auth.js';
import { validateRegister } from '../validation/auth.js';
import { validateLogin } from '../validation/auth.js';

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/refresh', refresh);
router.post('/logout', logout);

export default router;
