module.exports = (sequelize, DataTypes) => {
  const postsCategory = sequelize.define(
    "postsCategory",
    {
      postId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      categoryId: { type: DataTypes.INTEGER, foreignKey: true },
    },
    {
      timestamps: false,
      underscored: true,
      tablename: "posts_categories",
    }
  );

  postsCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: "categories",
      through: postsCategory,
      foreignKey: "postid",
      otherKey: "categoryid",
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: "blog_posts",
      through: postsCategory,
      foreignKey: "categoryId",
      otherKey: "postId",
    });
  };

  return postsCategory;
};
