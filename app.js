const express = require("express");
const mongoose = require("mongoose");

const usersRouter = require("./routes/users");
const clothingItemsRouter = require("./routes/clothingItems");

const app = express();

const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());

// temporary user for Project 12
app.use((req, res, next) => {
  req.user = {
    _id: "69ec63f7b1136096c02a7e23",
  };
  next();
});

app.use("/", usersRouter);
app.use("/", clothingItemsRouter);

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
