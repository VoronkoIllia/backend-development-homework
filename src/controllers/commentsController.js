const Comment = require("../models/Comment");
const Post = require("../models/Post");

const CommentsController = {
  async createComment(req, res) {
    try {
      const { text, author, postId } = req.body;

      const post = await Post.findById(postId);
      if (!post) {
        return res
          .status(404)
          .json({ success: false, message: "Post not found" });
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
    } catch (err) {
      console.error("Error creating comment:", err);
      res.status(400).json({ success: false, message: err.message });
    }
  },
  async deleteComment(req, res) {
    try {
      const { id } = req.params;
      const deletingComment = await Comment.findByIdAndDelete(id);

      if (!deletingComment) {
        return res
          .status(404)
          .json({ success: false, error: "Comment not found" });
      }

      res.status(204).json({
        success: true,
        message: "Comment deleted successfully",
      });
    } catch (err) {
      console.error("Error deleting comment:", err);
      res.status(500).json({ success: false, message: err.message });
    }
  },
  async getCommentsByPostId(req, res) {
    try {
      const { postId } = req.params;

      const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        count: comments.length,
        data: comments,
      });
    } catch (err) {
      console.error("Error fetching comments:", err);
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async updateComment(req, res) {
    try {
      const { id } = req.params;
      const { text, author } = req.body;

      const updatedComment = await Comment.findByIdAndUpdate(
        id,
        { text, author, updatedAt: Date.now() },
        { new: true, runValidators: true },
      );

      if (!updatedComment) {
        return res
          .status(404)
          .json({ success: false, message: "Comment not found" });
      }

      res.status(200).json({
        success: true,
        data: updatedComment,
        message: "Comment updated successfully",
      });
    } catch (err) {
      console.error("Error updating comment:", err);
      res.status(400).json({ success: false, message: err.message });
    }
  },
};

module.exports = CommentsController;
