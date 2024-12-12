const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
const Joi = require("joi");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const emailSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ["com", "net", "org", "id"] } })
    .required()
    .messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required",
    }),
});

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const { error } = emailSchema.validate({ email });

  if (error) {
    return res.status(400).json({
      message: "Invalid input",
      details: error.details.map((err) => ({
        field: err.context.key,
        message: err.message,
      })),
    });
  }

  next();
};

const regist = (req, res) => {
  const { name, email, password } = req.body;

  pool.query(
    "INSERT INTO users (name, balance, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, 0, email, password],
    (error, results) => {
      if (error) {
        return res.status(500).json({
          message: "Database error",
          error: error.message,
        });
      }
      res.status(201).json({
        message: "User registered successfully",
        user: results.rows[0],
      });
    }
  );
};

app.post("/users", validateEmail, regist);
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
