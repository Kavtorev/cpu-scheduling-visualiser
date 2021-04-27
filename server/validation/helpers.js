const { BadRequest } = require("../errors");

const validate = async (schema, reqBody) => {
  try {
    await schema.validateAsync(reqBody);
  } catch (error) {
    throw new BadRequest(error);
  }
};

module.exports = { validate };
