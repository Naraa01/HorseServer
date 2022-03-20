const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../../middleware/protect");
const {
  getHorses,
  createHorseM,
  updateHorse,
  getHorseM,
  deleteHorse,
} = require("../../controller/mon/horse");

router
  .route("/")
  .get(getHorses) //.post(protect, createHorseM);
  .post(protect, authorize("admin"), createHorseM);
router
  .route("/:id")
  .get(getHorseM)
  // .put(protect, updateHorse)
  // .delete(protect, deleteHorse)
  .put(updateHorse)
  .delete(deleteHorse);

module.exports = router;
