const express = require('express');
const { userControllers } = require('../controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', userControllers.createUser);
router.get('/', auth, userControllers.getAllUsers);

module.exports = router;