const { Router } = require("express");
const googleAuth = require("../middleware/googleAuth");
const { catchAsync } = require("../middleware/errors");
const User = require("../models/User");
const router = Router();

router.post(
  "/google/login",
  googleAuth,
  catchAsync(async (req, res, next) => {
    const { id } = req.user;
    const { tokenId, exp } = req.tokenMeta;
    res.status(200).json({ tokenId, exp, id, strategy: "google" });
  })
);

router.get("/google/logout", (req, res, next) => {
  res.status(200).json({ message: "Logged out." });
});

module.exports = router;
