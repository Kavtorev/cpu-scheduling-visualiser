import React from "react";
import { useGoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthStatus,
  googleLoginAsync,
  getIsLocalStrategy,
  getIsError,
} from "../../redux/user/userSlice";
import AuthButton from "../AuthButton";
import GoogleIcon from "../GoogleIcon";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => {
  return {
    googleLogIn: {
      padding: 0,
      backgroundColor: theme.palette.lightWhite,
      "&:hover": {
        backgroundColor: theme.palette.lightWhite,
      },
    },
    textColor: {
      color: theme.palette.primary.main,
    },
  };
});

export default function GoogleLogin() {
  const CLIENT_ID = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;
  const styles = useStyles();
  const dispatch = useDispatch();
  const isError = useSelector(getIsError);
  const isLocal = useSelector(getIsLocalStrategy);
  const authStatus = useSelector(getAuthStatus);

  const { signIn } = useGoogleLogin({
    clientId: CLIENT_ID,
    onSuccess,
    onFailure,
    isSignedIn: !(isLocal || isError),
    cookiePolicy: "single_host_origin",
  });

  function googleSingIn(e) {
    e.preventDefault();
    dispatch(googleLoginAsync.pending());
    signIn();
  }

  function onSuccess(res) {
    dispatch(googleLoginAsync(res));
  }

  function onFailure(res) {
    dispatch(googleLoginAsync.rejected());
  }

  return (
    <AuthButton
      text="Sign In"
      onClick={googleSingIn}
      disabled={authStatus === "loading"}
      className={styles.googleLogIn}
      textStyle={styles.textColor}
    >
      <GoogleIcon />
    </AuthButton>
  );
}
