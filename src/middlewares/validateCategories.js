const { categoryServices } = require('../services');

module.exports = async (req, _res, next) => {
    const { categoryIds } = req.body;
    const allCategories = await categoryServices.getAllCategories();
    const categoryIsFound = allCategories.filter(({ id }) => categoryIds.includes(id));
    if (categoryIsFound.length !== 0) {
       return next();
    }
    throw Error({
        message: '"categoryIds" not found',
      });
};