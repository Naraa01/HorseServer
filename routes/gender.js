const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/protect");
const { getGenders, createGender } = require("../controller/gender");

const { getCategoryHorses } = require("../controller/mon/horse");
router.route("/:genderId/horses").get(getCategoryHorses);

router
  .route("/")
  .get(getGenders) //.post(protect, createHorseM);
  .post(createGender);
// router
//   .route("/:id")
//   .get(getHorseM)
//   .put(updateHorse)
//   .delete(deleteHorse);

module.exports = router;
