require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routers/users.router");
const app = express();
const port = 8080;
var cors = require('cors')

app.use(cors())
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
