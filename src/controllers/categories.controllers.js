const Joi = require('joi');
const { categoryServices } = require('../services');

const validateNewCategoryBody = (body) =>
  Joi.object({
    name: Joi.string().required(),
  }).validate(body);

  const createCategory = async (req, res, next) => {
    const { error } = validateNewCategoryBody(req.body);
    if (error) return next(error);
    try {
      const result = await categoryServices.createCategory(req.body);
      const { id, name } = result.dataValues;
      return res.status(201).json({ id, name });
    } catch (e) {
      e.statusCode = 409;
      e.message = 'Category already registered';
      next(e);
    }
  };

module.exports = { createCategory };