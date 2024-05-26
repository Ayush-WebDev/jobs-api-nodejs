require("dotenv").config();
require("express-async-errors");
const express = require("express");
const morgon = require("morgan");
const mainRouter = require("./routes/job-route");
const notFound = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const { json } = require("body-parser");
const connectUserDB = require("./db/db-connection");
const userRouter = require("./routes/auth");
const authMiddleware = require("./middlewares/auth");
const helmet = require("helmet");
const cors = require("cors");
const { xss } = require("express-xss-sanitizer");
const rateLimiter = require("express-rate-limit");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("swagger-ui.yaml");
const port = process.env.PORT || 3000;

/// Important security packages : 1. Helmet, 2. Xss-clean 3. CORS 4. Express rate limit

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.set("trust-proxy", 1);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(rateLimiter({ windowMs: 15 * 1000 * 60, max: 100 }));
app.use(morgon("tiny"));

app.use("/api/v1", authMiddleware, mainRouter);
app.use("/", userRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);
const start = async () => {
  try {
    await connectUserDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
