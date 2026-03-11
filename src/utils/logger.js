const path = require("path");
const fs = require("fs");
const fsPromises = require("fs/promises");
const { LOG_PATH } = require("../config/env");

const dir = path.dirname(LOG_PATH);

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(LOG_PATH, "", "utf8"); // Створюємо порожній файл, якщо його ще немає
}

async function log(method, url, statusCode, startTime, duration) {
  const requestLog = {
    method,
    url,
    statusCode,
    duration,
    timestamp: new Date(startTime).toISOString(),
  };

  try {
    const data = await fsPromises.readFile(LOG_PATH, "utf8");
    const logs = JSON.parse(data || "[]");
    logs.push(requestLog);
    await fsPromises.writeFile(LOG_PATH, JSON.stringify(logs));
  } catch (err) {
    console.error("Failed to write log entry:", err);
  }
  return;
}

module.exports = {
  log,
};
