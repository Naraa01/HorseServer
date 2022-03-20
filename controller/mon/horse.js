const MyError = require("../../utils/myError");
const Horse = require("../../models/Mon/Horse");
const asyncHandler = require("express-async-handler");
const paginate = require("../../utils/paginate");
const Gender = require("../../models/Gender");

exports.getHorses = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const select = req.query.select;
  const sort = req.query.sort;
  ["select", "sort", "limit", "page"].forEach((el) => delete req.query[el]);

  const pagination = await paginate(page, limit, Horse);

  const horses = await Horse.find(req.query, select)
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);
  // console.log(query);
  res.status(200).json({
    success: true,
    count: horses.length,
    data: horses,
    pagination,
  });
});

// genders/:horseId/horses
exports.getCategoryHorses = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;
  const sort = req.query.sort;
  const select = req.query.select;
  let search = req.query.search;

  ["select", "sort", "page", "limit", "search"].forEach(
    (el) => delete req.query[el]
  );

  const pagination = await paginate(page, limit, Horse);

  if (!search) search = "";

  //req.query, select
  const horses = await Horse.find(
    {
      ...req.query,
      genderId: req.params.genderId,
      name: { $regex: search, $options: "i" },
    },
    select
  )
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: horses.length,
    data: horses,
    pagination,
  });
});

exports.createHorseM = asyncHandler(async (req, res, next) => {
  const gender = await Gender.findById(req.body.genderId);

  if (!gender) {
    throw new MyError(req.body.genderId + " ID-gender baihgui", 400);
  }

  req.body.createUser = req.userId;

  const horse = await Horse.create(req.body);

  res.status(200).json({ success: true, data: horse });
});

exports.getHorseM = asyncHandler(async (req, res, next) => {
  // const horse = await Horse.findById(req.params.id);
  const horse = await Horse.find({ _id: req.params.id });

  if (!horse) {
    throw new MyError(req.params.id + "id tei hosre oldoogue", 401);
  }

  res.status(200).json({
    success: true,
    data: horse,
  });
});

exports.updateHorse = asyncHandler(async (req, res, next) => {
  const horse = await Horse.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!horse) {
    throw new MyError(req.params.id + " id tei horse oldoogue", 401);
  }

  res.status(200).json({
    success: true,
    data: horse,
  });
});

exports.deleteHorse = asyncHandler(async (req, res, next) => {
  const horse = await Horse.findByIdAndDelete(req.params.id);

  if (!horse) {
    throw new MyError(`${req.params.id} id tei horse oldoogue`, 401);
  }

  //await horse.destroy();

  res.status(200).json({
    success: true,
    data: horse,
  });
});
