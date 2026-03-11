const path = require("path");
require("dotenv").config();

const ROOT_DIR = path.join(__dirname, "..", "..");

module.exports = {
  PORT: process.env.PORT || 3000,
  PUBLIC_DIR: path.join(ROOT_DIR, process.env.PUBLIC_DIR || "public"),
  LOG_PATH: path.join(
    ROOT_DIR,
    process.env.LOG_DIR || "logs",
    process.env.LOG_FILE || "requests.log",
  ),
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/notesdb",
};
