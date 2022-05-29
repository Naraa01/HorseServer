const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../../middleware/protect");
const {
  getSires,
  createSire,
  updateSire,
  getSire,
  deleteSire,
} = require("../../controller/mon/sire");

router
  .route("/")
  .get(getSires) //.post(protect, createSire);
  // .post(protect, createSire);
  .post(createSire);
router
  .route("/:id")
  .get(getSire)
  // .put(protect, updateSire)
  // .delete(protect, getSire)
  .put(updateSire)
  .delete(deleteSire);

module.exports = router;
