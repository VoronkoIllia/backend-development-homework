const express = require("express");
const router = express.Router();
const PostController = require("../controllers/postsController");
const postValidator = require("../middlewares/validators/postValidator");
const validate = require("../middlewares/validate");
const asyncHandler = require("../middlewares/asyncHandler");

router.post(
  "/",
  postValidator.createPostRules,
  validate,
  asyncHandler(PostController.createPost),
);
router.get(
  "/",
  postValidator.getPostsRules,
  validate,
  asyncHandler(PostController.getAllPosts),
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
  asyncHandler(PostController.getPostById),
);
router.delete(
  "/:id",
  postValidator.mongoIdParamRule,
  validate,
  asyncHandler(PostController.deletePost),
);
router.put(
  "/:id",
  postValidator.updatePostRules,
  validate,
  asyncHandler(PostController.updatePost),
);
router.post(
  "/:id/like",
  postValidator.mongoIdParamRule,
  validate,
  asyncHandler(PostController.likePost),
);

module.exports = router;
