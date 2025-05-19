const Joi = require('joi');

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Username must be a string.',
    'string.empty': 'Username is required.',
    'string.min': 'Username must be at least 3 characters.',
    'any.required': 'Username is required.'
  }),

  email: Joi.string().email().required().messages({
    'string.email': 'Email must be valid.',
    'string.empty': 'Email is required.',
    'any.required': 'Email is required.'
  }),

  password: Joi.string().pattern(passwordRegex).required().messages({
    'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    'string.empty': 'Password is required.',
    'any.required': 'Password is required.'
  }),

  confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': 'Confirm password must match password.',
    'any.required': 'Confirm password is required.'
  })
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be valid.',
    'string.empty': 'Email is required.',
    'any.required': 'Email is required.'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required.',
    'any.required': 'Password is required.'
  })
});

const adminRegisterSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Username must be a string.',
    'string.empty': 'Username is required.',
    'string.min': 'Username must be at least 3 characters.',
    'any.required': 'Username is required.'
  }),

  email: Joi.string().email().required().messages({
    'string.email': 'Email must be valid.',
    'string.empty': 'Email is required.',
    'any.required': 'Email is required.'
  }),

  role: Joi.string().valid("admin").required().messages({
    'string.valid':'Role must be admin',
    'string.empty': 'Role is required',
    'any.required': 'Role is required'
  }),

  password: Joi.string().pattern(passwordRegex).required().messages({
    'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    'string.empty': 'Password is required.',
    'any.required': 'Password is required.'
  }),

  confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': 'Confirm password must match password.',
    'any.required': 'Confirm password is required.'
  })
});

module.exports = { registerSchema, loginSchema, adminRegisterSchema };

