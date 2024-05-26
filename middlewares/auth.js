const jwt = require("jsonwebtoken");
const User = require("../model/user");
const CustomAPIError = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");

const authMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(
      new CustomAPIError("Unauthorized request", StatusCodes.UNAUTHORIZED)
    );
  }
  const token = authorization.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    return next(
      new CustomAPIError("Unauthorized request", StatusCodes.UNAUTHORIZED)
    );
  }
};

module.exports = authMiddleware;
