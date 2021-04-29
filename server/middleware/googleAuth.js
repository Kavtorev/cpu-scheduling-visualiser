const { Unauthorized } = require("../errors");
const { OAuth2Client } = require("google-auth-library");
const { GOOGLE_OAUTH_CLIENT_ID } = require("../config/google");
const User = require("../models/User");

const client = new OAuth2Client(GOOGLE_OAUTH_CLIENT_ID);

module.exports = async (req, res, next) => {
  if (!req.headers?.authorization) {
    return next(new Unauthorized());
  }
  try {
    const tokenId = req.headers.authorization.split(" ")[1].replace(",", "");
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: GOOGLE_OAUTH_CLIENT_ID,
    });
    const { name, email, picture, exp } = ticket.getPayload();

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        username: name,
        email,
        strategy: "google",
        picture,
      });
    }

    req.user = user;
    req.tokenMeta = { tokenId, exp };
  } catch (error) {
    return next(new Unauthorized(error.message));
  }

  next();
};
