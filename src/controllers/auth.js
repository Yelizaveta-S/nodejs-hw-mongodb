// import createHttpError from 'http-errors';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Session } from '../models/session.js';

dotenv.config();

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ status: 409, message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      status: 201,
      user: { email: newUser.email, id: newUser._id },
    });
  } catch (error) {
    next(error);
  }
};

const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '30d';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ status: 401, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: 401, message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    });
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    });

    await Session.findOneAndDelete({ userId: user._id });
    await Session.create({
      userId: user._id,
      accessToken,
      refreshToken,
      accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000),
      refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
    });

    res.status(200).json({
      status: 'success',
      message: 'Successfully logged in an user!',
      data: { accessToken },
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res
        .status(401)
        .json({ status: 401, message: 'Refresh token missing' });
    }

    const session = await Session.findOne({ refreshToken });
    if (!session) {
      return res
        .status(401)
        .json({ status: 401, message: 'Invalid refresh token' });
    }

    if (session.refreshTokenValidUntil < new Date()) {
      await Session.findByIdAndDelete(session._id);
      return res
        .status(401)
        .json({ status: 401, message: 'Refresh token expired' });
    }

    const accessToken = jwt.sign(
      { id: session.userId },
      process.env.JWT_SECRET,
      {
        expiresIn: ACCESS_TOKEN_EXPIRY,
      },
    );
    const newRefreshToken = jwt.sign(
      { id: session.userId },
      process.env.JWT_SECRET,
      {
        expiresIn: REFRESH_TOKEN_EXPIRY,
      },
    );

    await Session.findByIdAndDelete(session._id);
    await Session.create({
      userId: session.userId,
      accessToken,
      refreshToken: newRefreshToken,
      accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000),
      refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
    });

    res.status(200).json({
      status: 'success',
      message: 'Successfully refreshed a session!',
      data: { accessToken },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).json({ status: 401, message: 'Unauthorized' });
    }

    await Session.findOneAndDelete({ refreshToken });

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
