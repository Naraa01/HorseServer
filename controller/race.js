const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");

exports.getRaces = asyncHandler(async (req, res, next) => {
  const races = await req.db.race.findAll();
  // console.log(query);
  res.status(200).json({
    success: true,
    count: races.length,
    data: races,
  });
});

exports.createRace = asyncHandler(async (req, res, next) => {
  const race = await req.db.race.create(req.body);

  res.status(200).json({ success: true, data: race });
});

exports.getRace = asyncHandler(async (req, res, next) => {
  let race = await req.db.race.findByPk(req.params.id);

  if (!race) {
    throw new MyError(`${req.params.id} id tei hosre oldoogue`, 401);
  }

  res.status(200).json({
    success: true,
    data: race,
  });
});

exports.updateRace = asyncHandler(async (req, res, next) => {
  let race = await req.db.race.findByPk(req.params.id);

  if (!race) {
    throw new MyError(`${req.params.id} id tei race oldoogue`, 401);
  }

  race = await race.update(req.body);

  res.status(200).json({
    success: true,
    data: race,
    user: req.user.email,
  });
});

exports.deleteRace = asyncHandler(async (req, res, next) => {
  let race = await req.db.race.findByPk(req.params.id);

  if (!race) {
    throw new MyError(`${req.params.id} id tei race oldoogue`, 401);
  }

  await race.destroy();

  res.status(200).json({
    success: true,
    data: race,
  });
});
