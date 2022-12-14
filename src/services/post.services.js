const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { PostCategory, BlogPost, User, Category } = require('../models');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const createPost = async ({ userId, title, content, categoryIds }) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const blogPost = await BlogPost.create(
        { title, content, userId },
        { transaction: t },
      );
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

async function getAllBlogPosts() {
  try {
    const result = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: 'password' } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getAllBlogPostsByPk(id) {
  try {
    const result = await BlogPost.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: { exclude: 'password' } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    if (result === null) throw Error;
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const updatePost = async ({ title, content, id }) => {
  try {
    const result = await BlogPost.update({ title, content }, { where: { id } });
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deletePost = async (id) => {
  try {
    const result = await BlogPost.destroy({ where: { id } });
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getPostByText = async (text) => {
  const [result] = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${text}%` } },
        { content: { [Op.like]: `%${text}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return result;
};

module.exports = {
  createPost,
  getAllBlogPosts,
  getAllBlogPostsByPk,
  updatePost,
  deletePost,
  getPostByText,
};
