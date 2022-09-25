module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    displayName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
      },
  },
  { timestamps: false, underscored: true, tableName: "users" }
  );
  User.associate = (models) => {
    User.hasMany(models.BlogPost, {
      as: 'blog_posts',
      // foreignKey: 'id',
    })
  }
    return User;
};
