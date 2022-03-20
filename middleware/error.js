const errorHandler = (err, req, res, next) => {
  const error = { ...err };

  error.message = err.message;

  if (error.name === "JsonWebTokenError") {
    console.log("Token дээр ямар нэгэн алдаа гарлаадаа");
    error.message = "Нэвтэрч орно уу?"; //"Token дамжуулалт буруу байх. Token дамжуулаагүй байна"; //"Token - oo buruu damjuulaad bn bro!";
    error.statusCode = 405;
  }

  res.status(400).json({
    success: false,
    error,
  });
};
module.exports = errorHandler;
