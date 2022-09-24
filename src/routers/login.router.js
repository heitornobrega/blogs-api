const express = require('express');
const { userControllers } = require('../controllers');

const router = express.Router();

router.post('/', userControllers.getUser);

module.exports = router;