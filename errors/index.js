class BadRequest extends Error {
  constructor(message = "Bad request.") {
    super(message);
    this.status = 400;
  }
}

class Unauthorized extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.status = 401;
  }
}

class UnprocessableEntity extends Error {
  constructor(message = "Can't process entity") {
    super(message);
    this.status = 422;
  }
}

module.exports = {
  BadRequest,
  Unauthorized,
  UnprocessableEntity,
};
