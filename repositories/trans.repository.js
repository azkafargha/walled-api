

const getTransactionsByUserId = async (id) => {
    try {
      const result = await pool.query("SELECT * FROM transactions where id = $1", [
        id,
      ]);
      return result;
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };


  module.exports = { getTransactionsByUserId };