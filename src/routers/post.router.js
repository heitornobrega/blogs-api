const express = require('express');
const { postControllers } = require('../controllers');
const auth = require('../middlewares/auth');
// const validateCategories = require('../middlewares/validateCategories');

const router = express.Router();

router.post('/', auth, postControllers.createPost);
router.get('/', auth, postControllers.getAllBlogPosts);
router.get('/:id', auth, postControllers.getAllBlogPostsByPk);
router.put('/:id', auth, postControllers.updatePost);
router.delete('/:id', auth, postControllers.deletePost);

module.exports = router;