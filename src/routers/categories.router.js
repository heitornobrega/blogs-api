const express = require('express');
const { categoriesControllers } = require('../controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, categoriesControllers.createCategory);
router.get('/', auth, categoriesControllers.getAllCategories);

module.exports = router;