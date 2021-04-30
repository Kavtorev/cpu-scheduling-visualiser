import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { googleLogoutAsync } from "../../redux/user/userSlice";
import { getAuthStatus } from "../../redux/user/userSlice";
import { useGoogleLogout } from "react-google-login";
import AuthButton from "../AuthButton";
import GoogleIcon from "../GoogleIcon";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles({
  googleLogout: {
    width: 150,
  },
});
export default function GoogleLogin() {
  const CLIENT_ID = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;
  const dispatch = useDispatch();
  const authStatus = useSelector(getAuthStatus);
  const { signOut } = useGoogleLogout({
    clientId: CLIENT_ID,
    onLogoutSuccess,
    onFailure,
  });
  const styles = useStyles();

  function googleSignOut() {
    dispatch(googleLogoutAsync.pending());
    signOut();
  }

  function onLogoutSuccess(res) {
    dispatch(googleLogoutAsync());
  }

  function onFailure(res) {
    dispatch(googleLogoutAsync.rejected());
  }

  return (
    <AuthButton
      text="Google Log Out"
      onClick={googleSignOut}
      disabled={authStatus === "loading"}
      className={styles.googleLogout}
    >
      <GoogleIcon />
    </AuthButton>
  );
}
