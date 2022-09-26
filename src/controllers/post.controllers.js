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

const validatePostToUpdateBody = (body) =>
  Joi.object({
    title: Joi.string().required().messages({
      'any.required': FIELD_NOT_FOUND,
      'string.empty': FIELD_NOT_FOUND,
    }),
    content: Joi.string().required().messages({
      'any.required': FIELD_NOT_FOUND,
      'string.empty': FIELD_NOT_FOUND,
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
    e.statusCode = 400;
    e.message = '"categoryIds" not found';
    next(e);
  }
};

const getAllBlogPosts = async (_req, res, next) => {
  try {
    const result = await postServices.getAllBlogPosts();
    return res.status(200).json(result);
  } catch (error) {
    // error.statusCode = 400;
    // error.message = '"categoryIds" not found';
    next(error);
  }
};

const getAllBlogPostsByPk = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await postServices.getAllBlogPostsByPk(id);
    return res.status(200).json(result);
  } catch (error) {
    error.statusCode = 404;
    error.message = 'Post does not exist';
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  const { error } = validatePostToUpdateBody(req.body);
  if (error) {
    return next(error);
  }
  try {
    const { id: userId } = req.user;
    const { id } = req.params;
    const postToUpadate = await postServices.getAllBlogPostsByPk(id);
    if (postToUpadate.userId !== userId) throw Error;
    await postServices.updatePost({ id, ...req.body });
    const postUpadated = await postServices.getAllBlogPostsByPk(id);
    return res.status(200).json(postUpadated);
  } catch (e) {
    console.log(e);
    e.statusCode = 401;
    e.message = 'Unauthorized user';
    next(e);
  }
};

const deletePost = async (req, res, next) => {
  const { id: userId } = req.user;
  try {
    await postServices.getAllBlogPostsByPk(req.params.id);
  } catch (error) {
    error.statusCode = 404;
    error.message = 'Post does not exist';
    return next(error);
  }
  try {
    const postToDelete = await postServices.getAllBlogPostsByPk(req.params.id);
    if (postToDelete.userId !== userId) throw Error;
    await postServices.deletePost(req.params.id);
    return res.send(204);
  } catch (error) {
    error.statusCode = 401;
    error.message = 'Unauthorized user';
    return next(error);
  }
};

const getPostByText = async (req, res) => {
  if (!req.query.q) {
    const result = await postServices.getAllBlogPosts();
    return res.status(200).json(result);
  }
  const result = await postServices.getPostByText(req.query.q);
  if (!result) {
    return res.status(200).json([]);
  }
  return res.status(200).json([result]);
};

module.exports = {
  createPost,
  getAllBlogPosts,
  getAllBlogPostsByPk,
  updatePost,
  deletePost,
  getPostByText,
};
