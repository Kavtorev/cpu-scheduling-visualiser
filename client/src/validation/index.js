import * as yup from "yup";

export const validate = (schema) => (value) => {
  let errors;
  try {
    schema.validateSync(value);
  } catch (error) {
    if (error.errors) {
      errors = error.errors.join(" ");
    }
  }
  return errors;
};

export const arrivalTimeSchema = yup
  .number()
  .typeError("Please provide a number.")
  .min(0)
  .max(10)
  .required()
  .integer();

export const cpuTimeSchema = yup
  .number()
  .typeError("Please provide a number.")
  .min(1)
  .max(20)
  .required()
  .integer();

export const prioritySchema = yup
  .number()
  .typeError("Please provide a number.")
  .min(1)
  .max(10)
  .required()
  .integer();

export const inputOutputSchema = yup
  .number()
  .typeError("Please provide a number.")
  .min(1)
  .max(20)
  .required()
  .integer();

export const generateSchema = yup.object().shape({
  rowsNumber: yup
    .number()
    .typeError("Please provide a number.")
    .min(1)
    .max(20)
    .required()
    .integer(),
});

export const loginSchema = yup.object({
  email: yup
    .string("Enter your email.")
    .email("Invalid email format.")
    .required("Email field should be empty."),
  password: yup
    .string("Enter your password.")
    .min(8, "At least 8 characters.")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/, {
      message: "Password is weak.",
    })
    .required("Password is required"),
});

export const registerSchema = yup.object({
  username: yup.string("Enter your password.").min(4, "At least 4 characters"),
  email: yup
    .string("Enter your email.")
    .email("Invalid email format.")
    .required("Email field should not be empty."),
  password: yup
    .string("Enter your password.")
    .min(8, "At least 8 characters.")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/, {
      message: "Password is weak.",
    })
    .required("Password is required"),
  passwordConfirmation: yup
    .string("Confirm your password.")
    .oneOf([yup.ref("password"), null], "Passwords must match.")
    .required(),
});
