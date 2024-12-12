const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");


router.post("/users", userController.regist);

module.exports = router;