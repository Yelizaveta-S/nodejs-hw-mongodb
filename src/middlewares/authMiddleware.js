import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { Session } from '../models/session.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw createHttpError(401, 'Unauthorized');
    }

    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const session = await Session.findOne({ accessToken: token });
    if (!session || session.accessTokenValidUntil < new Date()) {
      throw createHttpError(401, 'Session expired, please log in again');
    }

    req.user = { _id: decoded.id };
    next();
  } catch (error) {
    next(error);
  }
};
