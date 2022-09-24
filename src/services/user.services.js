const { User } = require('../models');

const getUser = async ({ email, password }) => {
  const result = await User.findAll({
    where: {
      email,
      password,
    },
    attributes: { exclude: 'password' },
  });
  if (result.length === 0) throw Error;
  return result;
};

const createUser = async ({ displayName, email, password, image }) => {
  const result = await User.create(
    { displayName, email, password, image },
  );
  return result;
};

const getAllUsers = async () => {
  const result = await User.findAll(
    {
      attributes: { exclude: 'password' },
    },
  );
  return result;
};

const getUserById = async (id) => {
  const result = await User.findByPk(id, { attributes: { exclude: 'password' } });
  // console.log(result);
  if (result === null) throw Error;
  return result;
};

module.exports = { getUser, createUser, getAllUsers, getUserById };
