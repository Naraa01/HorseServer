const MyError = require("../../utils/myError");
const Comment = require("../../models/Mon/Comment");
const asyncHandler = require("express-async-handler");
const paginate = require("../../utils/paginate");
// const Gender = require("../../models/Gender");

exports.getComments = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const select = req.query.select;
  const sort = req.query.sort;
  ["select", "sort", "limit", "page"].forEach((el) => delete req.query[el]);

  const pagination = await paginate(page, limit, Comment);

  const comments = await Comment.find(req.query, select)
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);
  // console.log(query);
  res.status(200).json({
    success: true,
    count: comments.length,
    data: comments,
    pagination,
  });
});

exports.createComment = asyncHandler(async (req, res, next) => {
  // const gender = await Gender.findById(req.body.genderId);
  // if (!gender) {
  //   throw new MyError(req.body.genderId + " ID-gender baihgui", 400);
  // }
  // console.log("--- req ----", req);
  // console.log("--- req body hello -----", req.body);
  // console.log("--- req userId hello -----", req.userId);
  // req.body.createUser = req.userId;

  const comment = await Comment.create(req.body);

  res.status(200).json({ success: true, data: comment });
});

exports.getComment = asyncHandler(async (req, res, next) => {
  // const comment = await Comment.findById(req.params.id);
  const comment = await Comment.find({ _id: req.params.id });

  if (!comment) {
    throw new MyError(req.params.id + "id tei hosre oldoogue", 401);
  }

  res.status(200).json({
    success: true,
    data: comment,
  });
});

exports.updateComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!comment) {
    throw new MyError(req.params.id + " id tei comment oldoogue", 401);
  }

  res.status(200).json({
    success: true,
    data: comment,
  });
});

exports.deleteComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findByIdAndDelete(req.params.id);

  if (!comment) {
    throw new MyError(`${req.params.id} id tei comment oldoogue`, 401);
  }

  //await comment.destroy();

  res.status(200).json({
    success: true,
    data: comment,
  });
});
