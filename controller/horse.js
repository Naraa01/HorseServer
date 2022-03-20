const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");

exports.getHorses = asyncHandler(async (req, res, next) => {
  const horses = await req.db.horse.findAll();
  // console.log(query);
  res.status(200).json({
    success: true,
    count: horses.length,
    data: horses,
  });
});

exports.createHorse = asyncHandler(async (req, res, next) => {
  const horse = await req.db.horse.create(req.body);

  res.status(200).json({ success: true, data: horse });
});

exports.getHorse = asyncHandler(async (req, res, next) => {
  let horse = await req.db.horse.findByPk(req.params.id);

  if (!horse) {
    throw new MyError(`${req.params.id} id tei hosre oldoogue`, 401);
  }

  res.status(200).json({
    success: true,
    data: horse,
  });
});

exports.updateHorse = asyncHandler(async (req, res, next) => {
  let horse = await req.db.horse.findByPk(req.params.id);

  if (!horse) {
    throw new MyError(`${req.params.id} id tei horse oldoogue`, 401);
  }

  horse = await horse.update(req.body);

  res.status(200).json({
    success: true,
    data: horse,
  });
});

exports.deleteHorse = asyncHandler(async (req, res, next) => {
  let horse = await req.db.horse.findByPk(req.params.id);

  if (!horse) {
    throw new MyError(`${req.params.id} id tei horse oldoogue`, 401);
  }

  await horse.destroy();

  res.status(200).json({
    success: true,
    data: horse,
  });
});
