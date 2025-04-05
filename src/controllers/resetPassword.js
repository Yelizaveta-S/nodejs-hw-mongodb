import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { getEnvVar } from '../utils/getEnvVar.js';
import { User } from '../models/user.js';

export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      throw createError(400, 'Missing reset token');
    }

    const secret = getEnvVar('JWT_SECRET');
    let payload;

    try {
      payload = jwt.verify(token, secret);
    } catch {
      throw createError(400, 'Invalid or expired token');
    }

    const user = await User.findOne({ email: payload.email });
    if (!user) {
      throw createError(404, 'User not found!');
    }

    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      status: 200,
      message: 'Password has been successfully reset.',
      data: {},
    });
  } catch (err) {
    next(err);
  }
};
