const express = require("express");
const mainRouter = express.Router();

const {
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
  getJob,
} = require("../controllers/jobs-controllers");

mainRouter.route("/jobs").get(getAllJobs).post(createJob);
mainRouter.route("/jobs/:id").patch(updateJob).delete(deleteJob).get(getJob);

module.exports = mainRouter;
