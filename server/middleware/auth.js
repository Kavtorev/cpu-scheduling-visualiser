const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { Unauthorized } = require("../errors");
const { JWT_ACCESS_SECRET } = require("../config/jwt");

module.exports = async (req, res, next) => {
  if (!req.headers?.authorization) {
    return next(new Unauthorized());
  }

  try {
    const authHeader = req.headers.authorization;
    // why does a token have a comma in the end ???
    const token = authHeader.split(" ")[1].replace(",", "");
    var decoded = jwt.verify(token, JWT_ACCESS_SECRET);
  } catch (error) {
    return next(new Unauthorized("Session has been expired."));
  }

  const user = await User.findOne({ id: decoded.id });
  if (!user) {
    return next(new Unauthorized());
  }
  req.user = user;
  next();
};
