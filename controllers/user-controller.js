const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors/custom-error");

const User = require("../model/user");

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const newUser = new User({ ...req.body });
  const user = await User.findOne({ email: req.body.email });
  // if (!email || !password || !name) {
  //   return next(
  //     new CustomAPIError(
  //       "Please provide email and password",
  //       StatusCodes.BAD_REQUEST
  //     )
  //   );
  // }

  // if (user) {
  //   return next(new CustomAPIError("User already exists", 400));
  // }
  const userCreated = await newUser.save();
  res
    .status(StatusCodes.CREATED)
    .json({ userCreated, token: newUser.jwtToken() });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new CustomAPIError(
        "Please provide email and password",
        StatusCodes.BAD_REQUEST
      )
    );
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new CustomAPIError("Unauthorized", StatusCodes.UNAUTHORIZED));
  }
  const checkPass = await user.comparePassword(req.body.password);
  if (!checkPass) {
    next(new CustomAPIError("UnAuthorized", StatusCodes.UNAUTHORIZED));
  }
  const token = user.jwtToken();
  res.status(StatusCodes.OK).json({ msg: "Successfully loggedin", token });
};

module.exports = { registerUser, loginUser };
