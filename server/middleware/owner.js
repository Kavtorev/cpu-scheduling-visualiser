const { catchAsync } = require("./errors");
const Visualisation = require("../models/Visualisation");
const { UnprocessableEntity, BadRequest } = require("../errors");
module.exports = catchAsync(async (req, res, next) => {
  const record = await Visualisation.findById(req.params.id);
  if (!record) {
    return next(new UnprocessableEntity());
  }

  if (req.user.id !== record.owner.toString()) {
    return next(new BadRequest());
  }

  req.record = record;
  next();
});
