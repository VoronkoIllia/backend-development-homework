const express = require("express");
const router = express.Router();
const PostController = require("../controllers/postsController");
const postValidator = require("../middlewares/validators/postValidator");
const validate = require("../middlewares/validate");

router.post(
  "/",
  postValidator.createPostRules,
  validate,
  PostController.createPost,
);
router.get(
  "/",
  postValidator.getPostsRules,
  validate,
  PostController.getAllPosts,
);
router.get(
  "/search",
  postValidator.searchPostsRules,
  validate,
  PostController.searchPosts,
);
router.get(
  "/:id",
  postValidator.mongoIdParamRule,
  validate,
  PostController.getPostById,
);
router.delete(
  "/:id",
  postValidator.mongoIdParamRule,
  validate,
  PostController.deletePost,
);
router.put(
  "/:id",
  postValidator.updatePostRules,
  validate,
  PostController.updatePost,
);
router.post(
  "/:id/like",
  postValidator.mongoIdParamRule,
  validate,
  PostController.likePost,
);

module.exports = router;
