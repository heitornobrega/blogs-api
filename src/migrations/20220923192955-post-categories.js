"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("posts_categories", {
      post_id: {
        autoIncrement: false,
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'blog_posts',
          key: 'id',
        }
      },
      category_id: {
        autoIncrement: false,
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id',
        },
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("posts_categories");
  },
};
