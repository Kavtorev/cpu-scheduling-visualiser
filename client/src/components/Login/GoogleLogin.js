import React from "react";
import { useGoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { getAuthStatus, googleLoginAsync } from "../../redux/user/userSlice";
import { getIsError, getIsLocalStrategy } from "../../redux/user/userSlice";
import { Button } from "@material-ui/core";

export default function GoogleLogin() {
  const CLIENT_ID = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;
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
    console.log("ERROR", res);
  }

  return (
    <Button onClick={googleSingIn} disabled={authStatus === "loading"}>
      Google LogIn
    </Button>
  );
}
