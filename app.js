const express = require("express");
const mongoose = require("mongoose");

const routes = require("./routes");

const app = express();

const { PORT = 3001 } = process.env;

// connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

// middleware to parse JSON
app.use(express.json());

// temporary user for Project 12 (fake auth)
app.use((req, res, next) => {
  req.user = {
    _id: "69ec63f7b1136096c02a7e23",
  };
  next();
});

// use centralized routes
app.use("/", routes);

// test route
app.get("/", (req, res) => {
  res.send("Server is working");
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
