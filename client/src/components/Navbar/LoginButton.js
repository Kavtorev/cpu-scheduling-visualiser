import React from "react";
import AuthButton from "../AuthButton";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  loginRoot: {
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      border: `1px solid ${theme.palette.lightWhite}`,
    },
  },
}));

export default function LoginButton() {
  const styles = useStyles();
  return <AuthButton text="Sign In" className={styles.loginRoot} />;
}
