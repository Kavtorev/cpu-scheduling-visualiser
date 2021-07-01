const { Router } = require("express");
const verifyRefresh = require("../middleware/verify.refresh");
const generateTokens = require("../utils/tokens");
const router = Router();

router.get("/refresh", verifyRefresh, (req, res) => {
  const { token } = generateTokens({ user: req.user });
  res.status(200).json({ token });
});

module.exports = router;
