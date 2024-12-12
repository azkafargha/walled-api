const express = require("express");
const router = express.Router();
const transController = require("../controllers/trans.controller");
const authenticateToken = require("../middlewares/auth.middleware");


router.get("/transfer", authenticateToken, transController.getTransactions);

module.exports = router;