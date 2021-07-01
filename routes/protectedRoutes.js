const { Router } = require("express");
const router = Router();

router.use("/visualisations", require("./visualisations"));

module.exports = router;
