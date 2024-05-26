const express = require("express");
const authMiddleware = require("../middlewares/auth");
const userRouter = express.Router();
const { registerUser, loginUser } = require("../controllers/user-controller");

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

module.exports = userRouter;
