const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");

exports.getSires = asyncHandler(async (req, res, next) => {
  const sires = await req.db.sire.findAll();
  // console.log(query);
  res.status(200).json({
    success: true,
    count: sires.length,
    data: sires,
  });
});

exports.createSire = asyncHandler(async (req, res, next) => {
  const sire = await req.db.sire.create(req.body);

  res.status(200).json({ success: true, data: sire });
});

exports.getSire = asyncHandler(async (req, res, next) => {
  let sire = await req.db.sire.findByPk(req.params.id);

  if (!sire) {
    throw new MyError(`${req.params.id} id tei hosre oldoogue`, 401);
  }

  res.status(200).json({
    success: true,
    data: sire,
  });
});

exports.updateSire = asyncHandler(async (req, res, next) => {
  let sire = await req.db.sire.findByPk(req.params.id);

  if (!sire) {
    throw new MyError(`${req.params.id} id tei sire oldoogue`, 401);
  }

  sire = await sire.update(req.body);

  res.status(200).json({
    success: true,
    data: sire,
  });
});

exports.deleteSire = asyncHandler(async (req, res, next) => {
  let sire = await req.db.sire.findByPk(req.params.id);

  if (!sire) {
    throw new MyError(`${req.params.id} id tei sire oldoogue`, 401);
  }

  await sire.destroy();

  res.status(200).json({
    success: true,
    data: sire,
  });
});
