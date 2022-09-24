const Joi = require('joi');

const validateLoginBody = (body) =>
  Joi.object({
    email: Joi.string().required().messages({
      'any.required': 'Some required fields are missing',
      'string.empty': 'Some required fields are missing',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Some required fields are missing',
      'string.empty': 'Some required fields are missing',
    }),
  }).validate(body);

const validateNewUserBody = (body) =>
  Joi.object({
    displayName: Joi.string().min(8).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().required().email(),
    image: Joi.string().allow(null, ''),
  }).validate(body);

module.exports = {
    validateLoginBody,
    validateNewUserBody,
};