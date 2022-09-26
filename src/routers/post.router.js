const express = require('express');
const { postControllers } = require('../controllers');
const auth = require('../middlewares/auth');
// const validateCategories = require('../middlewares/validateCategories');

const router = express.Router();

router.post('/', auth, postControllers.createPost);

module.exports = router;