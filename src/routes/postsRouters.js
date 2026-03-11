const express = require("express");
const router = express.Router();
const PostController = require("../controllers/postsController");

router.post("/", PostController.createPost);
router.get("/", PostController.getAllPosts);
router.get("/search", PostController.searchPosts);
router.get("/:id", PostController.getPostById);
router.delete("/:id", PostController.deletePost);
router.put("/:id", PostController.updatePost);
router.post("/:id/like", PostController.likePost);

module.exports = router;
