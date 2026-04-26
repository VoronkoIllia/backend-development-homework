const Post = require("../models/Post");
const Comment = require("../models/Comment");
const ApiError = require("../errors/ApiError");

const PostController = {
  async createPost(req, res) {
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
  },

  async deletePost(req, res) {
    const { id } = req.params;
    const deletingPost = await Post.findByIdAndDelete(id);

    if (!deletingPost) {
      throw new ApiError.notFound("Post not found");
    }

    // Видаляємо всі коментарі, пов'язані з видаленим постом
    await Comment.deleteMany({ postId: id });

    await deletingPost.deleteOne();

    res.status(204).json({
      success: true,
      data: deletingPost,
      message: "Post deleted successfully",
    });
  },
  async getAllPosts(req, res) {
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
  },
  async getPostById(req, res) {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      throw new ApiError.notFound("Post not found");
    }

    const comments = await Comment.find({ postId: id }).sort({
      createdAt: -1,
    });

    res
      .status(200)
      .json({ success: true, data: { ...post.toObject(), comments } });
  },

  async searchPosts(req, res) {
    const { term } = req.query;
    const posts = await Post.find(
      { $text: { $search: term } },
      { score: { $meta: "textScore" } },
    ).sort({ score: { $meta: "textScore" } });

    res
      .status(200)
      .json({ success: true, data: posts, postsCount: posts.length });
  },

  async updatePost(req, res) {
    const { id } = req.params;
    const { title, text, tags, author } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, text, tags, author },
      { new: true, runValidators: true },
    );

    if (!updatedPost) {
      throw new ApiError.notFound("Post not found");
    }

    res.status(200).json({ success: true, data: updatedPost });
  },
  async likePost(req, res) {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true },
    );

    if (!post) {
      throw new ApiError.notFound("Post not found");
    }

    res.status(200).json({ success: true, data: post });
  },
};

module.exports = PostController;
