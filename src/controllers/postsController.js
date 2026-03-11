const Post = require("../models/Post");
const Comment = require("../models/Comment");

const PostController = {
  async createPost(req, res) {
    try {
      const { title, text, tags, author } = req.body;

      const newPost = new Post({
        title,
        text,
        tags: tags || [],
        author,
      });

      await newPost.save();
      res.status(201).json({
        success: true,
        data: newPost,
        message: "Post created successfully",
      });
    } catch (err) {
      console.error("Error creating post:", err);
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async deletePost(req, res) {
    try {
      const { id } = req.params;
      const deletingPost = await Post.findByIdAndDelete(id);

      if (!deletingPost) {
        return res
          .status(404)
          .json({ success: false, error: "Post not found" });
      }

      // Видаляємо всі коментарі, пов'язані з видаленим постом
      await Comment.deleteMany({ postId: id });

      await deletingPost.deleteOne();

      res.status(204).json({
        success: true,
        data: deletingPost,
        message: "Post deleted successfully",
      });
    } catch (err) {
      console.error("Error deleting post:", err);
      res.status(500).json({ success: false, message: err.message });
    }
  },
  async getAllPosts(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const posts = await Post.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      const postsWithCommentsCount = await Promise.all(
        posts.map(async (post) => {
          const commentsCount = await Comment.countDocuments({
            postId: post._id,
          });
          return { ...post.toObject(), commentsCount };
        }),
      );

      const totalPosts = await Post.countDocuments();
      const totalPages = Math.ceil(totalPosts / limit);

      res.status(200).json({
        success: true,
        count: posts.length,
        data: postsWithCommentsCount,
        totalPosts,
        totalPages,
        currentPage: page,
      });
    } catch (err) {
      console.error("Error fetching posts:", err);
      res.status(500).json({ success: false, message: err.message });
    }
  },
  async getPostById(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);

      if (!post) {
        return res
          .status(404)
          .json({ success: false, message: "Post not found" });
      }

      const comments = await Comment.find({ postId: id }).sort({
        createdAt: -1,
      });

      res
        .status(200)
        .json({ success: true, data: { ...post.toObject(), comments } });
    } catch (err) {
      console.error("Error fetching post:", err);
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async searchPosts(req, res) {
    try {
      const { term } = req.query;
      const posts = await Post.find(
        { $text: { $search: term } },
        { score: { $meta: "textScore" } },
      ).sort({ score: { $meta: "textScore" } });

      res
        .status(200)
        .json({ success: true, data: posts, postsCount: posts.length });
    } catch (err) {
      console.error("Error searching posts:", err);
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async updatePost(req, res) {
    try {
      const { id } = req.params;
      const { title, text, tags, author } = req.body;

      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { title, text, tags, author },
        { new: true, runValidators: true },
      );

      if (!updatedPost) {
        return res
          .status(404)
          .json({ success: false, message: "Post not found" });
      }

      res.status(200).json({ success: true, data: updatedPost });
    } catch (err) {
      console.error("Error updating post:", err);
      res.status(500).json({ success: false, message: err.message });
    }
  },
  async likePost(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.findByIdAndUpdate(
        id,
        { $inc: { likes: 1 } },
        { new: true },
      );

      if (!post) {
        return res
          .status(404)
          .json({ success: false, message: "Post not found" });
      }

      res.status(200).json({ success: true, data: post });
    } catch (err) {
      console.error("Error liking post:", err);
      res.status(500).json({ success: false, message: err.message });
    }
  },
};

module.exports = PostController;
