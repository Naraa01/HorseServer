const express = require("express");
//const { protect, authorize } = require("../middleware/protect");
const {
  register,
  login,
  getUsersM,
  // getUser,
  // createUser,
  // updateUser,
  deleteUserM,
} = require("../controller/userM");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);

// router.use(protect);

router.route("/usersss").get(getUsersM);
// .post( createUser);
router
  .route("/:id")
  // .get(authorize("admin", "operator"), getUser)
  // .put(authorize("admin"), updateUser)
  // .delete(authorize("admin"), deleteUserM)
  .delete(deleteUserM);

// router
//   .route("/:id/books")
//   .get(authorize("user", "admin", "operator"), getUserBooks);

module.exports = router;
