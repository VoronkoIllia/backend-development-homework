const CommentsController = require("../controllers/commentsController");
const express = require("express");
const router = express.Router();

router.post("/", CommentsController.createComment);
router.delete("/:id", CommentsController.deleteComment);
router.get("/post/:postId", CommentsController.getCommentsByPostId);
router.put("/:id", CommentsController.updateComment);

module.exports = router;
