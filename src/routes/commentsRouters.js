const CommentsController = require("../controllers/commentsController");
const express = require("express");
const router = express.Router();
const commentValidator = require("../middlewares/validators/commentValidator");
const validate = require("../middlewares/validate");

router.post(
  "/",
  commentValidator.createCommentRules,
  validate,
  CommentsController.createComment,
);
router.delete(
  "/:id",
  commentValidator.deleteCommentRules,
  validate,
  CommentsController.deleteComment,
);
router.get(
  "/post/:postId",
  commentValidator.postIdParamRules,
  validate,
  CommentsController.getCommentsByPostId,
);
router.put(
  "/:id",
  commentValidator.updateCommentRules,
  validate,
  CommentsController.updateComment,
);

module.exports = router;
