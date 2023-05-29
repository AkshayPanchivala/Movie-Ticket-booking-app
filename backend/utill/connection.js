const mongoose = require("mongoose");

const db = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_NAME);
    // connect.connection.host,
    // connect.connection.name
    console.log(`Database Connected `);
  } catch (err) {
    console.log(err);
  }
};

module.exports = db;
