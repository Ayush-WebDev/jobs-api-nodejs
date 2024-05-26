const express = require("express");
const authMiddleware = require("../middlewares/auth");
const userRouter = express.Router();

const { registerUser, loginUser } = require("../controllers/user-controller");

userRouter.get("/", (req, res) => {
  res.send(
    "<h1>Jobs Api documentation</h1><br><a href='/api-docs'>Documentation</a>"
  );
});

userRouter.post("/api/v1/register", registerUser);
userRouter.post("/api/v1/login", loginUser);

module.exports = userRouter;
