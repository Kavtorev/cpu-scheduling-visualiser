import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { googleLogoutAsync } from "../../redux/user/userSlice";
import { getAuthStatus } from "../../redux/user/userSlice";
import { useGoogleLogout } from "react-google-login";
import { Button } from "@material-ui/core";

export default function GoogleLogin() {
  const CLIENT_ID = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;
  const dispatch = useDispatch();
  const authStatus = useSelector(getAuthStatus);
  const { signOut } = useGoogleLogout({
    clientId: CLIENT_ID,
    onLogoutSuccess,
    onFailure,
  });

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
    <Button
      onClick={googleSignOut}
      disabled={authStatus === "loading"}
      style={{ color: "white" }}
    >
      Google Log Out
    </Button>
  );
}
