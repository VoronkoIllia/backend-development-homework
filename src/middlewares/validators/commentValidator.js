const { body, param } = require("express-validator");

const createCommentRules = [
  body("postId")
    .notEmpty()
    .withMessage("postId is required")
    .isMongoId()
    .withMessage("invalid postId"),
  body("author")
    .trim()
    .notEmpty()
    .withMessage("author is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("author length must be 3-50"),
  body("text")
    .trim()
    .notEmpty()
    .withMessage("text is required")
    .isLength({ min: 10, max: 500 })
    .withMessage("text length must be 10-500"),
];

const updateCommentRules = [
  param("id").isMongoId().withMessage("invalid comment id"),
  body("text")
    .trim()
    .notEmpty()
    .withMessage("text is required")
    .isLength({ min: 10, max: 500 })
    .withMessage("text length must be 10-500"),
];

const deleteCommentRules = [
  param("id").isMongoId().withMessage("invalid comment id"),
];

const postIdParamRules = [
  param("postId").isMongoId().withMessage("invalid postId"),
];

module.exports = {
  createCommentRules,
  updateCommentRules,
  deleteCommentRules,
  postIdParamRules,
};
