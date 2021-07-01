const { Router } = require("express");
const User = require("../models/User");
const verifyRefresh = require("../middleware/verify.refresh");
const bcrypt = require("bcrypt");
const generateTokens = require("../utils/tokens");
const { catchAsync } = require("../middleware/errors");
const { Unauthorized } = require("../errors");
const { loginSchema } = require("../validation/auth.schemas");
const { validate } = require("../validation/helpers");
const router = Router();

router.post(
  "/login",
  catchAsync(async (req, res) => {
    let { email, password } = req.body;
    // await validate(loginSchema, req.body);
    await validate(loginSchema, { email, password });
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      // throwing an error (because the code is sync) rather than passing it to next() handler
      throw new Unauthorized("Invalid combination of login and password.");
    }

    const { token, refreshToken } = generateTokens({ user });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
    });

    res.status(200).json({
      token,
      strategy: "local",
    });
  })
);

// check if a user is already logged in...

router.get("/logout", (req, res) => {
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logged out." });
});

module.exports = router;
