const { Router } = require("express");
const User = require("../models/User");
const Visualisation = require("../models/Visualisation");
const { catchAsync } = require("../middleware/errors");
const router = Router();

router.get(
  "/",
  catchAsync(async (req, res) => {
    const data = await Visualisation.find({ owner: req.user.id }, "id name");
    res.status(200).json({ data });
  })
);

router.post(
  "/create",
  catchAsync(async (req, res) => {
    const { data } = req.body;
    const vis = await Visualisation.create({ data });
    res.status(201).json({ id: vis.id });
  })
);

router.delete(
  "/delete",
  catchAsync(async (req, res) => {
    const { id } = req.body;
    await Visualisation.deleteOne({ id });
    res.status(204).send("resource deleted successfully");
  })
);

router.put(
  "/update",
  catchAsync(async (req, res) => {
    const { id, data } = req.body;
    await Visualisation.updateOne({ id }, { data });
    res.status(204).send("resource updated successfully");
  })
);

module.exports = router;
