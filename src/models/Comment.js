const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: [true, "Post ID is required"],
  },
  text: {
    type: String,
    required: [true, "Text is required"],
    minlength: [10, "Text must be at least 10 characters long"],
    maxlength: [500, "Text cannot exceed 500 characters"],
  },
  author: {
    type: String,
    required: [true, "Author is required"],
    minlength: [3, "Authors' names must be at least 3 characters long"],
    maxlength: [50, "Authors' names must be at most 50 characters long"],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);
