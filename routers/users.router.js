const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const authenticateToken = require("../middlewares/auth.middleware");

router.post("/auth/register", userController.regist);
router.post("/auth/login", userController.login);
router.get("/profile", authenticateToken, userController.getUserById);
router.get("/transfer", authenticateToken, userController.getTransactions);


module.exports = router;