const express = require("express");
const cors = require("cors");

const postRouter = require("./routes/postsRouters");
const commentRouter = require("./routes/commentsRouters");

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // JSON parser

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use("/posts", postRouter);
app.use("/comments", commentRouter);

// Головний маршрут
app.get("/", async (req, res) => {
  res.send("Home page");
});

module.exports = app;
