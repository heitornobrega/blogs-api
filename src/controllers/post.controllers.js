const Joi = require('joi');
const { postServices } = require('../services');

const FIELD_NOT_FOUND = 'Some required fields are missing';

const validateNewPostBody = (body) =>
  Joi.object({
    title: Joi.string().required().messages({
      'any.required': FIELD_NOT_FOUND,
      'string.empty': FIELD_NOT_FOUND,
    }),
    content: Joi.string().required().messages({
      'any.required': FIELD_NOT_FOUND,
      'string.empty': FIELD_NOT_FOUND,
    }),
    categoryIds: Joi.array().min(1).required().messages({
      'array.min': FIELD_NOT_FOUND,
    }),
  }).validate(body);

const createPost = async (req, res, next) => {
  const { error } = validateNewPostBody(req.body);
  if (error) {
    console.log(error);
    return next(error);
  }
  try {
    const { id: userId } = req.user;
    const result = await postServices.createPost({ userId, ...req.body });
    return res.status(201).json(result);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const getAllBlogPosts = async (_req, res, next) => {
  try {
    const result = await postServices.getAllBlogPosts();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { createPost, getAllBlogPosts };
