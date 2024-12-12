const Joi = require("joi");
const userRepository = require("../repositories/users.repository");

const regist = async (userData) => {
    
  let user = await userRepository.findUserByEmail(userData.email);
  if (user.rows.length > 0) {
    throw new Error("user already exist");
  }
  user = await userRepository.regist(userData);
  return user;
};

module.exports = { regist };