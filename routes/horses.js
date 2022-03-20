const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/protect");
const {
  getHorses,
  createHorse,
  getHorse,
  updateHorse,
  deleteHorse,
} = require("../controller/horse");

router
  .route("/")
  .get(getHorses)
  // .post(protect, createHorse);
  .post(createHorse);
//.post(createHorse);
// .get(getHorses)
// .post(createHorse)
// .put(updateHorse)
// .delete(deleteHorse);

router
  .route("/:id")
  .get(getHorse)
  .put(protect, updateHorse)
  .delete(protect, deleteHorse);
// .put(updateHorse);
// .delete(deleteHorse);

module.exports = router;

// {

//   "name": "Amgalan turiin 2ajn222ai sharga",
//   "father": "Тогоруу Халтар",
//   "mother": "Цагаан",
//   "photo": "sharga.jpg",
//   "origin": "Монгол",
//   "pedigree": "Тогоруу-Галшар",
//   "color": "Шарга",
//   "gender": "Азарга",
//   "sire": "Э.Эрдэнэчулуун",
//   "owner": "Наранхүү",
//   "country": "Монгол",
//   "info": "Хэнтий аймгаас гаралтай",
//   "award": "Улсын баяр наадамд 6 дараалан түрүү"
// }
