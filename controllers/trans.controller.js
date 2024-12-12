const Joi = require("joi");
const transService = require("../services/trans.service");



const getTransactions = async (req, res) => {
    try {
      const { id } = req.user;
      const transactions = await userService.getTransactionsByUserId(id);
      res.status(200).json({ data: transactions.rows });
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  };

  module.exports = {getTransactions };