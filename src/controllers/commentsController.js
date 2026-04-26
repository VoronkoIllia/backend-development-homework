const ApiError = require("../errors/ApiError");
const Comment = require("../models/Comment");
const Post = require("../models/Post");

const CommentsController = {
  async createComment(req, res) {
    const { text, author, postId } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      throw new ApiError.notFound("Post not found");
    }

    const newComment = new Comment({
      text,
      author,
      postId,
    });

    await newComment.save();

    res.status(201).json({
      success: true,
      data: newComment,
      message: "Comment created successfully",
    });
  },
  async deleteComment(req, res) {
    const { id } = req.params;
    const deletingComment = await Comment.findByIdAndDelete(id);

    if (!deletingComment) {
      throw new ApiError.notFound("Comment not found");
    }

    res.status(204).json({
      success: true,
      message: "Comment deleted successfully",
    });
  },
  async getCommentsByPostId(req, res) {
    const { postId } = req.params;

    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: comments.length,
      data: comments,
    });
  },

  async updateComment(req, res) {
    const { id } = req.params;
    const { text, author } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { text, author, updatedAt: Date.now() },
      { new: true, runValidators: true },
    );

    if (!updatedComment) {
      throw new ApiError.notFound("Comment not found");
    }

    res.status(200).json({
      success: true,
      data: updatedComment,
      message: "Comment updated successfully",
    });
  },
};

module.exports = CommentsController;
