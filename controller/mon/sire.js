const MyError = require("../../utils/myError");
const Sire = require("../../models/Mon/Sire");
const asyncHandler = require("express-async-handler");
const paginate = require("../../utils/paginate");
// const Gender = require("../../models/Gender");

exports.getSires = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const select = req.query.select;
  const sort = req.query.sort;
  ["select", "sort", "limit", "page"].forEach((el) => delete req.query[el]);

  const pagination = await paginate(page, limit, Sire);

  const sires = await Sire.find(req.query, select)
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);
  // console.log(query);
  res.status(200).json({
    success: true,
    count: sires.length,
    data: sires,
    pagination,
  });
});

exports.createSire = asyncHandler(async (req, res, next) => {
  // const gender = await Gender.findById(req.body.genderId);
  // if (!gender) {
  //   throw new MyError(req.body.genderId + " ID-gender baihgui", 400);
  // }

  req.body.createUser = req.userId;

  const sire = await Sire.create(req.body);

  res.status(200).json({ success: true, data: sire });
});

exports.getSire = asyncHandler(async (req, res, next) => {
  // const sire = await Sire.findById(req.params.id);
  const sire = await Sire.find({ _id: req.params.id });

  if (!sire) {
    throw new MyError(req.params.id + "id tei hosre oldoogue", 401);
  }

  res.status(200).json({
    success: true,
    data: sire,
  });
});

exports.updateSire = asyncHandler(async (req, res, next) => {
  const sire = await Sire.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!sire) {
    throw new MyError(req.params.id + " id tei sire oldoogue", 401);
  }

  res.status(200).json({
    success: true,
    data: sire,
  });
});

exports.deleteSire = asyncHandler(async (req, res, next) => {
  const sire = await Sire.findByIdAndDelete(req.params.id);

  if (!sire) {
    throw new MyError(`${req.params.id} id tei sire oldoogue`, 401);
  }

  //await sire.destroy();

  res.status(200).json({
    success: true,
    data: sire,
  });
});
