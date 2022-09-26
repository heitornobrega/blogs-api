const Sequelize = require('sequelize');
const { PostCategory, BlogPost, User } = require('../models');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const createPost = async ({ userId, title, content, categoryIds }) => {
    try {
        const result = await sequelize.transaction(async (t) => {
            const blogPost = await BlogPost.create({ title, content, userId }, { transaction: t });
            const postId = blogPost.id;
            const info = categoryIds.map((categoryId) => ({ postId, categoryId }));
            await PostCategory.bulkCreate(info, { transaction: t });
            return blogPost.dataValues;  
        });
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getAllBlogPosts = async () => {
    try {
        const result = await BlogPost.findAll({
            include: [{ model: PostCategory }, { model: User }],
        });
        console.log('teste', result);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = { createPost, getAllBlogPosts };