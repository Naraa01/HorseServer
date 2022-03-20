const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/protect");
const {
  getPedigrees,
  createPedigree,
  getPedigree,
  updatePedigree,
  deletePedigree,
} = require("../controller/pedigree");

router
  .route("/")
  .get(getPedigrees)
  // .post(protect, createPedigree);
  .post(createPedigree);

router
  .route("/:id")
  .get(getPedigree)
  // .put(protect, updatePedigree)
  // .delete(protect, deletePedigree);
  .put(updatePedigree)
  .delete(deletePedigree);

module.exports = router;
