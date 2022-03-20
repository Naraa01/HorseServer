const express = require("express");
const { protect, authorize } = require("../middleware/protect");
const {
  getSires,
  getSire,
  createSire,
  updateSire,
  deleteSire,
} = require("../controller/sire");

const router = express.Router();

router
  .route("/")
  .get(getSires)
  // .post(protect, authorize("user", "admin"), createSire);
  .post(createSire);

router
  .route("/:id")
  .get(getSire)
  // .put(protect, authorize("user", "admin"), updateSire)
  // .delete(protect, authorize("user", "admin"), deleteSire);
  .put(updateSire)
  .delete(deleteSire);

module.exports = router;
