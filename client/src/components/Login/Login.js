import React from "react";
import { TextField, Button } from "@material-ui/core";
import { useFormik } from "formik";
import { loginSchema } from "../../validation";
import { useStyles } from "./LoginStyles";
import {
  logInAsync,
  getAuthStatus,
  logOutAsync,
} from "../../redux/user/userSlice";
import { closeAuthModal } from "../../redux/ui/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

export default function Login() {
  const styles = useStyles();
  const dispatch = useDispatch();
  const authStatus = useSelector(getAuthStatus);

  const handleLogin = (values) => {
    dispatch(logInAsync(values))
      .then(unwrapResult)
      .then(() => dispatch(closeAuthModal()))
      .catch((error) => dispatch(logOutAsync(error.message)));
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="authentication__email">
          <TextField
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            id="standard-email-input"
            name="email"
            label="Email"
            variant="outlined"
            className={styles.form}
            onChange={formik.handleChange}
            value={formik.values.email}
            required
          />
        </div>
        <div className="authentication__password">
          <TextField
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            id="standard-password-input"
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            className={styles.form}
            value={formik.values.password}
            onChange={formik.handleChange}
            required
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={styles.button}
          disabled={authStatus === "loading"}
        >
          {authStatus === "loading" ? "Logging in..." : "Login"}
        </Button>
      </form>
    </>
  );
}
