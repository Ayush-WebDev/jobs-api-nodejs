const mongoose = require("mongoose");

const connectUserDB = (pathUri) => {
  return mongoose.connect(pathUri);
};

module.exports = connectUserDB;
