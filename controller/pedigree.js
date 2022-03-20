const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");

exports.getPedigrees = asyncHandler(async (req, res, next) => {
  const pedigrees = await req.db.pedigree.findAll();
  // console.log(query);
  res.status(200).json({
    success: true,
    count: pedigrees.length,
    data: pedigrees,
  });
});

exports.createPedigree = asyncHandler(async (req, res, next) => {
  const pedigree = await req.db.pedigree.create(req.body);

  res.status(200).json({ success: true, data: pedigree });
});

exports.getPedigree = asyncHandler(async (req, res, next) => {
  let pedigree = await req.db.pedigree.findByPk(req.params.id);

  if (!pedigree) {
    throw new MyError(`${req.params.id} id tei hosre oldoogue`, 401);
  }

  res.status(200).json({
    success: true,
    data: pedigree,
  });
});

exports.updatePedigree = asyncHandler(async (req, res, next) => {
  let pedigree = await req.db.pedigree.findByPk(req.params.id);

  if (!pedigree) {
    throw new MyError(`${req.params.id} id tei pedigree oldoogue`, 401);
  }

  pedigree = await pedigree.update(req.body);

  res.status(200).json({
    success: true,
    data: pedigree,
  });
});

exports.deletePedigree = asyncHandler(async (req, res, next) => {
  let pedigree = await req.db.pedigree.findByPk(req.params.id);

  if (!pedigree) {
    throw new MyError(`${req.params.id} id tei pedigree oldoogue`, 401);
  }

  await pedigree.destroy();

  res.status(200).json({
    success: true,
    data: pedigree,
  });
});
