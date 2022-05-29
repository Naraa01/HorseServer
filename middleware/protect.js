const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const MyError = require("../utils/myError");
const User = require("../models/userM");

exports.protect = asyncHandler(async (req, res, next) => {
  // if (!req.headers.authorization) {
  //   throw new MyError(
  //     "Алдаа гарч байна!! ",
  //     // "Ene uildliig hiihed tanii neg l ym bolohgu bna, Authorization header utgaa shalgana uu??",
  //     401
  //   );
  // }
  // console.log("protect request ----------", req);
  // const token = req.headers.authorization.split(" ")[1];

  // if (!token) {
  //   throw new MyError("Token baihgu bn ", 401);
  // }
  // const tokenObj = jwt.verify(token, process.env.JWT_SECRET);
  // req.userId = tokenObj.id;
  // req.userRole = tokenObj.role;
  // req.user = await User.findById(tokenObj.id);
  // next();

  // **************************
  // console.log(req.headers);
  let token = null;

  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies) {
    token = req.cookies["amazon-token"];
  }

  if (!token) {
    throw new MyError(
      "Энэ үйлдлийг хийхэд таны эрх хүрэхгүй байна. Та эхлээд логин хийнэ үү. Authorization header-ээр эсвэ Cookie ашиглан токеноо дамжуулна уу.",
      401
    );
  }

  const tokenObj = jwt.verify(token, process.env.JWT_SECRET);

  req.userId = tokenObj.id;
  req.userRole = tokenObj.role;

  next();
});

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      throw new MyError(
        "Таны эрх хүрэхгүй байна [" + req.userRole + "] шалгаж үзнэ үү", //erh hurehgu bn
        403
      );
    }

    next();
  };
};
