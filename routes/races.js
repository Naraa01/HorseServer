const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/protect");
const {
  getRaces,
  createRace,
  getRace,
  updateRace,
  deleteRace,
} = require("../controller/race");

router
  .route("/")
  .get(getRaces)
  // .post(protect, authorize("user", "admin"), createRace);
  .post(createRace);

router
  .route("/:id")
  .get(getRace)
  // .put(protect, authorize("user", "admin"), updateRace)
  // .delete(protect, authorize("user", "admin"), deleteRace);
  .put(updateRace)
  .delete(deleteRace);

module.exports = router;
