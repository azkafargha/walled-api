const transRepository = require("../repositories/trans.repository");

const getTransactionsByUserId = async (id) => {
    try {
      const transactions = await transRepository.getTransactionsByUserId(id);
      return transactions;
    } catch (error) {
      throw error;
    }
  };

  module.exports = { getTransactionsByUserId };