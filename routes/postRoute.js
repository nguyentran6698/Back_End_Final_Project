const {
  getAllPosts,
  createPost,
  getPostByName,
  updatePost,
  removePost,
} = require("../controllers/postController");
const { authenticateUser } = require("../middleware/authentication");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .post(authenticateUser, createPost)
  .get(authenticateUser, getAllPosts);
router.route("/getPostName").post(authenticateUser, getPostByName);
router
  .route("/:id")
  .patch(authenticateUser, updatePost)
  .delete(authenticateUser, removePost);

module.exports = router;
