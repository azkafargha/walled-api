const Joi = require("joi");
const userService = require("../services/users.service");
const { UserResponse } = require("../dto/userResponse");

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  avatar_url: Joi.string().optional(),
  fullname: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const getUserById = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await userService.getUserById(Number(id));
    res.status(200).json({ data: new UserResponse(user) });
  } catch (error) {
    if (error.message === "user not found") {
      return res.status(404).json({ error: error.message });
    }
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const regist = async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const user = await userService.regist(value);

    return res.status(201).json({ data: user });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
};
const login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const token = await userService.login(value);
    res.status(200).json({ data: { token: token } });
  } catch (error) {
    if (error.message === "404") {
      return res.status(404).json({ message: "user doesn't exist" });
    }

    if (error.message === "401") {
      return res.status(404).json({ message: "email or password not valid" });
    }
    return res.status(500).json({ error: error.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const { id } = req.user;
    const transactions = await userService.getTransactionsByUserId(id);
    res.status(200).json({ data: transactions.rows });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const transferController = async (req, res) => {
  const { senderId, receiverId, amount, notes } = req.body;
  const newamount = parseInt(req.body.amount, 10); // Konversi amount ke integer

  if (!senderId || !receiverId || !newamount || isNaN(newamount) || newamount <= 0) {
    return res.status(400).json({
      message: "senderId, receiverId, and a valid amount are required",
    });
  }

  try {
    const result = await userService.transfer(
      senderId,
      receiverId,
      newamount, // Gunakan amount yang sudah dikonversi
      notes
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  regist,
  login,
  getUserById,
  getTransactions,
  transferController,
};
