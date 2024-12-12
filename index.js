require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routers/users.router");
const transRouter = require("./routers/trans.router");
const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(userRouter);
app.use(transRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
