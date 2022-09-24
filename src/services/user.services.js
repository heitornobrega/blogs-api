const { User } = require('../models');

const getUser = async ({ email, password }) => {
  const result = await User.findAll({
    where: {
      email,
      password,
    },
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

module.exports = { getUser, createUser };
