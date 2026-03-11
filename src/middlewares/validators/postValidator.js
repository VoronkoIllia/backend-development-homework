const { body, param, query } = require("express-validator");

const createPostRules = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("title is required")
    .isLength({ min: 5, max: 100 })
    .withMessage("title length must be 5-100"),
  body("text")
    .trim()
    .notEmpty()
    .withMessage("text is required")
    .isLength({ min: 10 })
    .withMessage("text min length is 10"),
  body("author")
    .trim()
    .notEmpty()
    .withMessage("author is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("author length must be 3-50"),
  body("tags").optional().isArray().withMessage("tags must be an array"),
  body("tags.*")
    .optional()
    .isString()
    .withMessage("each tag must be a string")
    .trim(),
];

const updatePostRules = [
  param("id").isMongoId().withMessage("invalid post id"),
  body("title")
    .optional()
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage("title length must be 5-100"),
  body("text")
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage("text length must be 10"),
  body("tags")
    .optional()
    .isArray()
    .withMessage("tags must be an array")
    .isLength({ max: 10 })
    .withMessage("tags count must be less than or equal to 10"),
  body("tags.*")
    .optional()
    .isString()
    .withMessage("each tag must be a string")
    .trim(),
];

const getPostsRules = [
  query("page")
    .optional()
    .toInt()
    .isInt({ min: 1 })
    .withMessage("page must be >= 1"),
  query("limit")
    .optional()
    .toInt()
    .isInt({ min: 1, max: 100 })
    .withMessage("limit must be 1-100"),
];

const searchPostsRules = [
  query("term")
    .trim()
    .notEmpty()
    .withMessage("term is required")
    .isLength({ min: 2 })
    .withMessage("term min length is 2"),
];

const mongoIdParamRule = [
  param("id").isMongoId().withMessage("id has invalid format"),
];

module.exports = {
  createPostRules,
  updatePostRules,
  getPostsRules,
  searchPostsRules,
  mongoIdParamRule,
};
