const mongoose = require("mongoose");
const { MONGODB_URI } = require("./env");

const connectDB = async () => {
  console.log("MONGODB_URI:", MONGODB_URI);
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
