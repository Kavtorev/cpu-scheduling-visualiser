const jwt = require("jsonwebtoken");
const {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_EXP,
  JWT_REFRESH_EXP,
} = require("../config/jwt");

function generateTokens({ user, accessExp, refreshExp }) {
  const token = jwt.sign(
    { id: user.id, name: user.username },
    JWT_ACCESS_SECRET,
    {
      expiresIn: accessExp || JWT_ACCESS_EXP,
    }
  );

  const refreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, {
    expiresIn: refreshExp || JWT_REFRESH_EXP,
  });
  return { token, refreshToken };
}

module.exports = generateTokens;
