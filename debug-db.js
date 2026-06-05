const mongoose = require("mongoose");
const User = require("./models/user");

async function run() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

  const users = await User.find().select("+password email");

  users.forEach((u) => {
    console.log({
      email: u.email,
      passwordLooksHashed: u.password?.startsWith("$2b$"),
    });
  });

  await mongoose.disconnect();
}

run();
