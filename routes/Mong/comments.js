const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../../middleware/protect");
const {
  getComments,
  createComment,
  updateComment,
  getComment,
  deleteComment,
} = require("../../controller/mon/comment");

router
  .route("/")
  .get(getComments)
  // .post(protect, createComment);
  .post(createComment);
// .post(protect, authorize("user", "admin", "operator"), createComment);

router
  .route("/:id")
  .get(getComment)
  // .put(protect, updateComment)
  // .delete(protect, getComment)
  .put(updateComment)
  .delete(deleteComment);

module.exports = router;
