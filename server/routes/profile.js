const { Router } = require("express");
const User = require("../models/User");
const { catchAsync } = require("../middleware/errors");
const router = Router();

router.put(
  "/update",
  catchAsync(async (req, res) => {
    const { username } = req.body;
    await User.updateOne({ id: req.user.id }, { username });
    res.status(200).json({ username });
  })
);

module.exports = router;
