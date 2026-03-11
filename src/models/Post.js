const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minLength: [5, "Title must be at least 5 characters long"],
    maxLength: [100, "Title must be at most 100 characters long"],
  },
  text: {
    type: String,
    required: [true, "Text is required"],
    minLength: [10, "Text must be at least 10 characters long"],
  },
  tags: [{ type: String }],
  author: {
    type: String,
    required: [true, "Author is required"],
    minLength: [3, "Authors' names must be at least 3 characters long"],
    maxLength: [50, "Authors' names must be at most 50 characters long"],
  },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

postSchema.index({ title: "text", text: "text" });

module.exports = mongoose.model("Post", postSchema);
