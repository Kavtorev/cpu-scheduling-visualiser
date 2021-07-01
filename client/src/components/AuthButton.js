import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { openAuthModal } from "../redux/ui/uiSlice";

const useStyles = makeStyles(() => ({
  authButton: {
    width: "90px",
    height: "35.22px",
    textTransform: "none",
    margin: " 0 1em",
  },
}));

export default function AuthButton({
  text = "",
  textStyle = "",
  className = {},
  children = null,
  modalPage = "",
  ...rest
}) {
  const styles = useStyles();
  const dispatch = useDispatch();

  const handleClick = () => dispatch(openAuthModal(modalPage));
  return (
    <Button
      className={clsx(styles.authButton, className)}
      onClick={handleClick}
      {...rest}
    >
      {children}
      <Typography variant="button" className={textStyle}>
        {text}
      </Typography>
    </Button>
  );
}
