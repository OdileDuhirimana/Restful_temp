const Joi = require('joi');

const updateProfileSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  email: Joi.string().email(),
  profileImage: Joi.string().uri().optional()
});

const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$'))
    .message('Password must be at least 6 characters and include uppercase, lowercase, number, and special character.')
});

module.exports = { updateProfileSchema, changePasswordSchema };
