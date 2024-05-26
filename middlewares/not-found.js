const { StatusCodes } = require("http-status-codes");
const notFound = async (req, res) => {
  res.status(StatusCodes.NOT_FOUND).send("Resource doesn't exist");
};

module.exports = notFound;
