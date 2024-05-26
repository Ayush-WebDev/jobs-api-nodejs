const mongoose = require("mongoose");

const connectDB = async (pathUri) => {
  try {
    await mongoose.connect(pathUri);
  } catch (error) {
    console.log(error);
  }
};

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company"],
      maxlength: 100,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId, /// We need to connect with user collection
      ref: "User",
      required: [true, "Please provide an user"],
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema); /// collection name is in capitalized format

module.exports = Job;
