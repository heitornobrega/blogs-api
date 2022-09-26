module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define(
    "BlogPost",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: { type: DataTypes.STRING },
      content: { type: DataTypes.STRING },
      userId: { type: DataTypes.INTEGER, foreignKey: true },
      published: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamp: true,
      createdAt: "published",
      updatedAt: "updated",
      underscored: true,
      tableName: 'blog_posts'
    }
  );
    BlogPost.associate = (models) => {
        BlogPost.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userId',
        })
    }
    return BlogPost;
};
