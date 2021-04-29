const { Router } = require("express");
const googleAuth = require("../middleware/googleAuth");
const { catchAsync } = require("../middleware/errors");
const User = require("../models/User");
const router = Router();

// essentially this route logs or registers a user
router.post(
  "/google/login",
  googleAuth,
  catchAsync(async (req, res, next) => {
    const { name, email, picture } = req.user;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        username: name,
        email,
        strategy: "google",
        picture,
      });
    }

    const { tokenId, exp } = req.tokenMeta;
    res.status(200).json({ tokenId, exp, id: user.id, strategy: "google" });
  })
);

router.get("/google/logout", (req, res, next) => {
  res.status(200).json({ message: "Logged out." });
});

module.exports = router;
