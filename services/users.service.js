const userRepository = require("../repositories/users.repository");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../utils/auth.util");

const regist = async (userData) => {
  let user = await userRepository.findUserByEmail(userData.email);
  if (user.rows.length > 0) {
    throw new Error("user already exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  const newUser = { ...userData, password: hashedPassword };
  user = await userRepository.regist(newUser);
  return user;
};

const login = async (userData) => {
  let user = await userRepository.findUserByEmail(userData.email);
  if (user.rows.length === 0) {
    throw new Error("user not found");
  }

  const isPasswordMatched = await bcrypt.compare(
    userData.password,
    user.rows[0].password
  );

  if (!isPasswordMatched) {
    throw new Error(401);
  }

  const token = generateAccessToken({
    email: userData.email,
    id: user.rows[0].id,
  });
  return token;
};

const getUserById = async (id) => {
  let user = await userRepository.findUserById(id);
  if (!user) {
    throw new Error("user not found");
  }
  return user;
};
const getTransactionsByUserId = async (id) => {
  try {
    const transactions = await userRepository.getTransactionsByUserId(id);
    return transactions;
  } catch (error) {
    throw error;
  }
};

const transfer = async (senderId, receiverId, amount, notes) => {
  try {
    if (amount <= 0) {
      throw new Error("Amount must be greater than zero");
    }

    const sender = await userRepository.findUserById(senderId);
    const receiver = await userRepository.findUserById(receiverId);

    if (!sender) {
      throw new Error("Sender not found");
    }
    if (!receiver) {
      throw new Error("Receiver not found");
    }

    if (sender.balance < amount) {
      throw new Error("Insufficient balance");
    }
    if (senderId === receiverId) {
      throw new Error("Berharap cepat kaya kah");
    }

    // Update balance for sender and receiver
    await userRepository.updateUserBalance(
      senderId,
      parseInt(sender.balance, 10) - parseInt(amount, 10) // Pastikan konversi ke integer
    );
    await userRepository.updateUserBalance(
      receiverId,
      parseInt(receiver.balance, 10) + parseInt(amount, 10) // Pastikan konversi ke integer
    );

    // Create transactions for sender and receiver
    const debitTransaction = await userRepository.createTransaction(
      senderId,
      amount,
      notes || "Transfer to user",
      "debit", // Manual type
      `Transfer to user ID ${receiverId}`
    );

    const creditTransaction = await userRepository.createTransaction(
      receiverId,
      amount,
      notes || "Transfer from user",
      "credit", // Manual type
      `Transfer from user ID ${senderId}`
    );

    return {
      message: "Transfer successful",
      transactions: {
        debitTransaction,
        creditTransaction,
      },
      senderBalance: sender.balance - amount,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  regist,
  login,
  getUserById,
  getTransactionsByUserId,
  transfer,
};
