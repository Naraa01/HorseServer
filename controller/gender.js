const MyError = require("../utils/myError");
const Gender = require("../models/Gender");
const asyncHandler = require("express-async-handler");

exports.getGenders = asyncHandler(async (req, res, next) => {
  const select = req.query.select;
  const genders = await Gender.find(req.query, select);

  res.status(200).json({
    success: true,
    count: genders.length,
    data: genders,
  });
});

exports.createGender = asyncHandler(async (req, res, next) => {
  const gender = await Gender.create(req.body);

  res.status(200).json({ success: true, data: gender });
});
