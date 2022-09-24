const { Category } = require('../models');

const createCategory = async ({ name }) => {
    const result = await Category.create({ name });
    // console.log(result);
    return result;
};

module.exports = { createCategory };