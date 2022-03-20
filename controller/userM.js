const UserM = require("../models/userM");
const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");
//const paginate = require("../utils/paginate");

//  register
exports.register = asyncHandler(async (req, res, next) => {
  const user = await UserM.create(req.body);
  const token = user.getJsonWebToken();

  res.status(200).json({
    success: true,
    token,
    user: user,
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { name, password } = req.body;

  if (!name || !password) {
    throw new MyError("Нэвтрэх нэр эсвэл нууц үгээ оруулна уу?", 401);
  }

  const user = await UserM.findOne({ name }).select("+password");

  if (!user) {
    throw new MyError("Нэвтрэх нэр эсвэл нууц үгээ зөв оруулна уу??", 402);
  }

  const ok = await user.checkPassword(password);

  if (!ok) {
    throw new MyError("Нэвтрэх нэр эсвэл нууц үгээ зөв оруулна уу???", 403);
  }

  res.status(200).json({
    success: true,
    login: true,
    token: user.getJsonWebToken(),
    user: user,
  });
});

// exports.login = asyncHandler(async (req, res, next) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     throw new MyError("Имэйл эсвэл нууц үгээ оруулна уу?", 401);
//   }

//   const user = await UserM.findOne({ email }).select("+password");

//   if (!user) {
//     throw new MyError("Имэйл эсвэл нууц үгээ зөв оруулна уу??", 402);
//   }

//   const ok = await user.checkPassword(password);

//   if (!ok) {
//     throw new MyError("Имэйл эсвэл нууц үгээ зөв оруулна уу???", 403);
//   }

//   res.status(200).json({
//     success: true,
//     login: true,
//     token: user.getJsonWebToken(),
//     user: user,
//   });
// });

exports.getUsersM = asyncHandler(async (req, res, next) => {
  // const page = parseInt(req.query.page) || 1;
  // const limit = parseInt(req.query.limit) || 10;
  // const select = req.query.select;
  // const sort = req.query.sort;
  // ["select", "sort", "limit", "page"].forEach((el) => delete req.query[el]);

  // const pagination = await paginate(page, limit, UserM);

  const users = await UserM.find(req.query);

  // const users = await UserM.find(req.query, select);
  // .sort(sort)
  // .skip(pagination.start - 1)
  // .limit(limit);

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
    //pagination,
  });
});

// exports.getUserM = asyncHandler(async (req, res, next) => {
//   const user = await UserM.findById(req.params.id);
//   if (!user) {
//     throw new MyError(req.params.id + "Hereglegch oldsongu ee ", 400);
//   }

//   res.status(200).json({
//     success: true,
//     data: user,
//   });
// });

// exports.createUserM = asyncHandler(async (req, res, next) => {
//   const user = await UserM.create(req.body);

//   res.status(200).json({
//     success: true,
//     data: user,
//   });
// });

// exports.updateUserM = asyncHandler(async (req, res, next) => {
//   const user = await UserM.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });
//   if (!user) {
//     throw new MyError(req.params.id + "Update hiih hereglegch bhgu bn", 400);
//   }
//   res.status(200).json({
//     success: true,
//     data: user,
//   });
// });

exports.deleteUserM = asyncHandler(async (req, res, next) => {
  const user = await UserM.findById(req.params.id);
  if (!user) {
    throw new MyError(req.params.id + "Ustgah hereglegch bhgu bn  ", 400);
  }

  user.remove();

  res.status(200).json({
    success: true,
    data: user,
  });
});
