const { User } = require('../models');

const getUser = async ({ email, password }) => {
  const result = await User.findAll({
    where: {
      email,
      password,
    },
  });
  console.log(result);
  if (result.length === 0) throw Error('user not found');
  return result;
};

module.exports = { getUser };
