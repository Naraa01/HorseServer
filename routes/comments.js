const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/protect");
const {
  getComments,
  createComment,
  getComment,
  updateComment,
  deleteComment,
} = require("../controller/comment");

router
  .route("/")
  .get(getComments)
  // .post(protect, authorize("user", "admin"), createComment);
  .post(createComment);

router
  .route("/:id")
  .get(getComment)
  // .put(protect, authorize("user", "admin"), updateComment)
  // .delete(protect, authorize("user", "admin"), deleteComment);
  .put(updateComment)
  .delete(deleteComment);

module.exports = router;
