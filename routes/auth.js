const express = require("express");
const authMiddleware = require("../middlewares/auth");
const userRouter = express.Router();

const { registerUser, loginUser } = require("../controllers/user-controller");

userRouter.get("/", (req, res) => {
  res.send(
    "<h1>Jobs Api documentation</h1><br><a href='/api/v1/jobs'>Documentation</a>"
  );
});

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

module.exports = userRouter;
