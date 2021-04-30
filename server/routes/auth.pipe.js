const { Router } = require("express");
const auth = require("../middleware/auth");
const googleAuth = require("../middleware/googleAuth");
const router = Router();

const protRouteRegExp = /\/(local|google)/;

router.use("/google", googleAuth);
router.use("/local", auth);

// protected routes
router.use(protRouteRegExp, require("./protectedRoutes"));

module.exports = router;
