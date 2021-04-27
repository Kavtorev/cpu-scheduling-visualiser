const { Unauthorized } = require("../errors");
const { OAuth2Client } = require("google-auth-library");
const { GOOGLE_OAUTH_CLIENT_ID } = require("../config/google");

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

    req.user = { name, email, picture };
    req.tokenMeta = { tokenId, exp };
  } catch (error) {
    return next(new Unauthorized(error.message));
  }

  next();
};
