const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect(
     process.env.MONGODB_NAME
    );
    console.log("Database Connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = db;
