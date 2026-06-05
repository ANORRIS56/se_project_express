require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');

const routes = require('./routes');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const { PORT = 3001 } = process.env;
const { MONGO_URL = 'mongodb://127.0.0.1:27017/wtwr' } = process.env;

// =========================
// DATABASE
// =========================
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// =========================
// SECURITY
// =========================
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// =========================
// MIDDLEWARES
// =========================
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Temporary user injection (ONLY if your project requires it)
app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133',
  };
  next();
});

// =========================
// ROUTES
// =========================
app.use('/', routes);

// =========================
// ERROR HANDLING
// =========================
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

// =========================
// START SERVER
// =========================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
