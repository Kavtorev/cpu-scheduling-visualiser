import React from "react";
import { TextField, Button } from "@material-ui/core";
import { useFormik } from "formik";
import { registerSchema } from "../../validation";
import { useStyles } from "./RegisterStyles";
import { useDispatch, useSelector } from "react-redux";
import {
  registerAsync,
  getAuthStatus,
  logOutAsync,
} from "../../redux/user/userSlice";
import { closeAuthModal } from "../../redux/ui/uiSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export default function Register() {
  const styles = useStyles();
  const dispatch = useDispatch();
  const authStatus = useSelector(getAuthStatus);

  const handleRegistration = async (values) => {
    dispatch(registerAsync(values))
      .then(unwrapResult)
      .then(() => dispatch(closeAuthModal()))
      .catch((error) => dispatch(logOutAsync(error.message)));
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: registerSchema,
    onSubmit: handleRegistration,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="authentication__username">
          <TextField
            id="standard-username-input"
            name="username"
            label="Username"
            variant="outlined"
            className={styles.form}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            onChange={formik.handleChange}
            value={formik.values.username}
            required
          />
        </div>
        <div className="authentication__email">
          <TextField
            id="standard-email-input"
            name="email"
            label="Email"
            variant="outlined"
            className={styles.form}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            onChange={formik.handleChange}
            value={formik.values.email}
            required
          />
        </div>
        <div className="authentication__password">
          <TextField
            id="standard-password-input"
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            className={styles.form}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            onChange={formik.handleChange}
            value={formik.values.password}
            required
          />
        </div>
        <div className="authentication_passwordConfirmation">
          <TextField
            id="standard-password-input"
            name="passwordConfirmation"
            label="Password Confirmation"
            type="password"
            variant="outlined"
            className={styles.form}
            error={
              formik.touched.passwordConfirmation &&
              Boolean(formik.errors.passwordConfirmation)
            }
            helperText={
              formik.touched.passwordConfirmation &&
              formik.errors.passwordConfirmation
            }
            onChange={formik.handleChange}
            value={formik.values.passwordConfirmation}
            required
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          className={styles.button}
          type="submit"
          disabled={authStatus === "loading"}
        >
          {authStatus === "loading" ? "Registering..." : "Register"}
        </Button>
      </form>
    </>
  );
}
