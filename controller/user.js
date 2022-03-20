const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await req.db.user.findAll();
  // console.log(query);
  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await req.db.user.create(req.body);

  res.status(200).json({ success: true, data: user });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  let user = await req.db.user.findByPk(req.params.id);

  if (!user) {
    throw new MyError(`${req.params.id} id tei hosre oldoogue`, 401);
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  let user = await req.db.user.findByPk(req.params.id);

  if (!user) {
    throw new MyError(`${req.params.id} id tei user oldoogue`, 401);
  }

  user = await user.update(req.body);

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  let user = await req.db.user.findByPk(req.params.id);

  if (!user) {
    throw new MyError(`${req.params.id} id tei user oldoogue`, 401);
  }

  await user.destroy();

  res.status(200).json({
    success: true,
    data: user,
  });
});
