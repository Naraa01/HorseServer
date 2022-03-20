const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");

exports.getComments = asyncHandler(async (req, res, next) => {
  const comments = await req.db.comment.findAll();
  // console.log(query);
  res.status(200).json({
    success: true,
    count: comments.length,
    data: comments,
  });
});

exports.createComment = asyncHandler(async (req, res, next) => {
  const comment = await req.db.comment.create(req.body);

  res.status(200).json({ success: true, data: comment });
});

exports.getComment = asyncHandler(async (req, res, next) => {
  let comment = await req.db.comment.findByPk(req.params.id);

  if (!comment) {
    throw new MyError(`${req.params.id} id tei hosre oldoogue`, 401);
  }

  res.status(200).json({
    success: true,
    data: comment,
  });
});

exports.updateComment = asyncHandler(async (req, res, next) => {
  let comment = await req.db.comment.findByPk(req.params.id);

  if (!comment) {
    throw new MyError(`${req.params.id} id tei comment oldoogue`, 401);
  }

  comment = await comment.update(req.body);

  res.status(200).json({
    success: true,
    data: comment,
  });
});

exports.deleteComment = asyncHandler(async (req, res, next) => {
  let comment = await req.db.comment.findByPk(req.params.id);

  if (!comment) {
    throw new MyError(`${req.params.id} id tei comment oldoogue`, 401);
  }

  await comment.destroy();

  res.status(200).json({
    success: true,
    data: comment,
  });
});
