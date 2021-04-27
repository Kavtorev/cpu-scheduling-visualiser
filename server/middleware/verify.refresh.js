const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { catchAsync } = require("../middleware/errors");
const { Unauthorized } = require("../errors");
const { JWT_REFRESH_SECRET } = require("../config/jwt");

module.exports = async (req, res, next) => {
  if (!req.cookies?.refreshToken) {
    return next(new Unauthorized());
  }
  try {
    // making decoded var accessible outside the block scope.
    // verify() returns the payload decoded if the signature is valid and optional expiration, audience, or issuer are valid. If not, it will throw the error.
    var decoded = jwt.verify(req.cookies.refreshToken, JWT_REFRESH_SECRET, {
      ignoreExpiration: false,
    });
  } catch (err) {
    return next(new Unauthorized("Invalid Session"));
  }

  const user = await User.findOne({ id: decoded.id });
  if (!user) {
    return next(new Unauthorized());
  }
  req.user = user;
  next();
};
