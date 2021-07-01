const { Router } = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { catchAsync } = require("../middleware/errors");
const { BadRequest } = require("../errors");
const { registerSchema } = require("../validation/auth.schemas");
const { validate } = require("../validation/helpers");

const router = Router();

router.post(
  "/register",
  catchAsync(async (req, res) => {
    await validate(registerSchema, req.body);
    let { username, email, password } = req.body;

    const exists = await User.exists({ email });

    if (exists) {
      throw new BadRequest("Invalid email.");
    }
    const passwordHash = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: passwordHash,
      strategy: "local",
    });
    res.redirect(307, "/login");
  })
);

module.exports = router;
