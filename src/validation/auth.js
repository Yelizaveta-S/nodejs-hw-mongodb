import Joi from 'joi';
import { validateBody } from '../middlewares/validateBody.js';

export const validateRegister = validateBody(
  Joi.object({
    name: Joi.string().required().messages({
      'any.required': 'Name is required',
    }),
    email: Joi.string().email().required().messages({
      'any.required': 'Valid email is required',
      'string.email': 'Valid email is required',
    }),
    password: Joi.string().min(6).required().messages({
      'any.required': 'Password is required',
      'string.min': 'Password must be at least 6 characters long',
    }),
  }),
);

export const validateLogin = validateBody(
  Joi.object({
    email: Joi.string().email().required().messages({
      'any.required': 'Valid email is required',
      'string.email': 'Valid email is required',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Password is required',
    }),
  }),
);

export const emailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required',
  }),
});

export const resetPasswordSchema = Joi.object({
  newPassword: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'any.required': 'Password is required',
  }),
});

export const resetPasswordFinalSchema = Joi.object({
  token: Joi.string().required().messages({
    'any.required': 'Token is required',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'Password is required',
    'string.min': 'Password must be at least 6 characters long',
  }),
});