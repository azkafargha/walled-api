const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const authenticateToken = require("../middlewares/auth.middleware");

router.post("/auth/register", userController.regist);
router.post("/auth/login", userController.login);
router.get("/profile", authenticateToken, userController.getUserById);
router.post("/transfer", userController.transferController);


module.exports = router;