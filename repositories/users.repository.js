const pool = require("../db/db");

const findUserById = async (id) => {
    try {
      const result = await pool.query("SELECT * FROM users where id = $1", [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };

const findUserByEmail = async (email) => {
  try {
    const result = await pool.query("SELECT * FROM users where email = $1", [
      email,
    ]);
    return result;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const regist = async (req) => {
  const { email, username, fullname, password, avatar_url } = req;

  const result = await pool.query(
    "INSERT INTO users (email, username, fullname, password, avatar_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [email, username, fullname, password, avatar_url],
    );
    (error, results) => {
      if (error) {
        throw error;
      }
    }
  return result.rows[0]

};



module.exports = { regist, findUserByEmail, findUserById };
