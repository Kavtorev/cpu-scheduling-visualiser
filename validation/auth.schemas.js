const Joi = require("joi");

const username = Joi.string().alphanum().min(3).max(64).trim().required();
// d@m.ru
// email addresses are lowercased as far as they are not case sensitive.
const email = Joi.string()
  .email()
  .min(8)
  .max(128)
  .lowercase()
  .trim()
  .required();

const password = Joi.string()
  .min(8)
  .message("Password must be at least 8 characters long.")
  .max(128)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/)
  .message(
    "Password must contain one uppercase letter, one lowercase letter, one digit and one special character."
  )
  .required();

const passwordConfirmation = Joi.valid(Joi.ref("password")).required();

const loginSchema = Joi.object({ email, password });
const registerSchema = Joi.object({
  username,
  email,
  password,
  passwordConfirmation,
});

module.exports = {
  loginSchema,
  registerSchema,
};
