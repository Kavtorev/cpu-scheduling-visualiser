import React from "react";
import style from "./Auth.module.css";
import Login from "../../components/login/Login";
import Register from "../../components/register/Register";
import Alert from "@material-ui/lab/Alert";
import { useSelector } from "react-redux";
import { getErrorMessage } from "../../redux/user/userSlice";
export default function AuthContainer({ location }) {
  const error = useSelector(getErrorMessage);
  const isLoginPath = location.pathname === "/login";
  const headerContent = isLoginPath ? "Sign In" : "Sign Up";

  return (
    <div className={style.authentication}>
      {error ? <Alert severity="warning">{error}</Alert> : null}
      <h1 className={style.authentication__header}>{headerContent}</h1>
      {isLoginPath ? <Login /> : <Register />}
    </div>
  );
}
