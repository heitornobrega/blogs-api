const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { userServices } = require('../services');

const { JWT_SECRET } = process.env;

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

const getUser = async (req, res, next) => {
  const { error } = validateLoginBody(req.body);
  if (error) return next(error);
  try {
    const user = req.body;
    const result = await userServices.getUser(user);
    const { id, displayName, email } = result[0];
    const payload = { id, displayName, email };
    const configs = {
      expiresIn: '1h',
    };
    const token = jwt.sign(payload, JWT_SECRET, configs);
    return res.status(200).json({ token });
  } catch (e) {
    e.statusCode = 400;
    e.message = 'Invalid fields';
    next(e);
  }
};

const createUser = async (req, res, next) => {
  const { error } = validateNewUserBody(req.body);
  if (error) return next(error);
  try {
    const result = await userServices.createUser(req.body);
    const { id, displayName, email } = result.dataValues;
    const payload = { id, displayName, email };
    const configs = {
      expiresIn: '1h',
    };
    const token = jwt.sign(payload, JWT_SECRET, configs);
    return res.status(201).json({ token });
  } catch (e) {
    e.statusCode = 409;
    e.message = 'User already registered';
    next(e);
  }
};

const getAllUsers = async (_req, res) => {
  const result = await userServices.getAllUsers();
  return res.status(200).json(result);
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await userServices.getUserById(id);
    return res.status(200).json(result);
  } catch (e) {
    e.statusCode = 404;
    e.message = 'User does not exist';
    next(e);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    await userServices.deleteUser(id);
    return res.send(204);
  } catch (error) {
    next(error);
  }
};

module.exports = { getUser, createUser, getAllUsers, getUserById, deleteUser };
