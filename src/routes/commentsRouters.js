const CommentsController = require("../controllers/commentsController");
const express = require("express");
const router = express.Router();
const commentValidator = require("../middlewares/validators/commentValidator");
const validate = require("../middlewares/validate");
const asyncHandler = require("../middlewares/asyncHandler");

router.post(
  "/",
  commentValidator.createCommentRules,
  validate,
  asyncHandler(CommentsController.createComment),
);
router.delete(
  "/:id",
  commentValidator.deleteCommentRules,
  validate,
  asyncHandler(CommentsController.deleteComment),
);
router.get(
  "/post/:postId",
  commentValidator.postIdParamRules,
  validate,
  asyncHandler(CommentsController.getCommentsByPostId),
);
router.put(
  "/:id",
  commentValidator.updateCommentRules,
  validate,
  asyncHandler(CommentsController.updateComment),
);

module.exports = router;
