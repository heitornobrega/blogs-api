const { Category } = require('../models');

const createCategory = async ({ name }) => {
    const result = await Category.create({ name });
    return result;
};

const getAllCategories = async () => {
    const result = await Category.findAll({ order: [['id', 'ASC']] });
    return result;
};

module.exports = { createCategory, getAllCategories };