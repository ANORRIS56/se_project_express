require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

const routes = require("./routes");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();

// PORT
const { PORT = 3001 } = process.env;

// =========================
// DATABASE CONNECTION
// =========================
const { MONGO_URL = "mongodb://127.0.0.1:27017/wtwr" } = process.env;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// =========================
// MIDDLEWARES
// =========================
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// =========================
// TEST ROUTE
// =========================
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// =========================
// ROUTES
// =========================
app.use(routes);

// =========================
// ERROR LOGGING
// =========================
app.use(errorLogger);

// Celebrate errors
app.use(errors());

// Central error handler
app.use(errorHandler);

// =========================
// START SERVER
// =========================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
