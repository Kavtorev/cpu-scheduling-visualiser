const notFoundResponse = (req, res, next) => {
  res.status(404).json({ message: "Not found." });
};

const internalServerError = (err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal server error." });
};

const catchAsync = (handler) => {
  return (req, res, next) => {
    handler(req, res, next).catch((err) => next(err));
  };
};

module.exports = {
  notFoundResponse,
  internalServerError,
  catchAsync,
};
