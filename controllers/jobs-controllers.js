const { StatusCodes } = require("http-status-codes");
const Job = require("../model/jobs");
const CustomAPIError = require("../errors/custom-error");

const getAllJobs = async (req, res, next) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  if (!jobs) {
    return next(new CustomAPIError("Not found", StatusCodes.NOT_FOUND));
  }
  res.status(200).json({ jobs: jobs, msg: "Success", count: jobs.length });
};

const createJob = async (req, res, next) => {
  const { position, status, company } = req.body;
  req.body.createdBy = req.user.userId;
  if (!position || !status || !company) {
    return next(new CustomAPIError("Bad request", StatusCodes.BAD_REQUEST));
  }

  const newJob = new Job({ ...req.body });
  await newJob
    .save()
    .then((response) => res.status(StatusCodes.OK).json(response))
    .catch((err) =>
      next(new CustomAPIError("Bad request", StatusCodes.BAD_REQUEST))
    );
};

const getJob = async (req, res) => {
  const job = await Job.findOne({
    createdBy: req.user.userId,
    _id: req.params.id,
  });
  if (!job) return next(new CustomAPIError("Not found", StatusCodes.NOT_FOUND));
  res.status(200).json({ job: job, msg: "Success" });
};

const updateJob = async (req, res, next) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id },
  } = req;

  if (!company || !position) {
    return next(
      new CustomAPIError(
        "Please provide company and position",
        StatusCodes.NOT_FOUND
      )
    );
  }

  const job = await Job.findOneAndUpdate(
    { _id: id, createdBy: userId },
    { ...req.body },
    { new: true, runValidators: true }
  );
  if (!job) return next(new CustomAPIError("Not found", StatusCodes.NOT_FOUND));
  res.status(200).json({ job: job, msg: "Success" });
};

const deleteJob = async (req, res, next) => {
  const {
    params: { id },
    user: { userId },
  } = req;
  const job = await Job.findOneAndDelete({ _id: id, createdBy: userId });
  if (!job) {
    return next(new CustomAPIError("Not Found", StatusCodes.NOT_FOUND));
  }

  res.status(200).json({ msg: "Success" });
};

module.exports = { getAllJobs, createJob, updateJob, deleteJob, getJob };
