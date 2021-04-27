import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useDispatch, useSelector } from "react-redux";
import {
  closeAuthModal,
  getIsAuthModalOpen,
  getModalPage,
  setModalPage,
} from "../redux/ui/uiSlice";
import { getErrorMessage } from "../redux/user/userSlice";
import Alert from "@material-ui/lab/Alert";
import { Paper, Typography } from "@material-ui/core";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  container: {
    position: "absolute",
    width: 400,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  paperRoot: {
    padding: "1em",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    borderTop: "5px solid black",
    textAlign: "center",
  },
});

function SwitchOption({ text, ...rest }) {
  return <Button {...rest}>{text}</Button>;
}

export default function AuthModal() {
  const styles = useStyles();
  const dispatch = useDispatch();
  const open = useSelector(getIsAuthModalOpen);
  const error = useSelector(getErrorMessage);
  const page = useSelector(getModalPage);
  const isLogin = page === "login";

  const handleClose = () => dispatch(closeAuthModal());

  const handlePageChange = () =>
    dispatch(setModalPage(isLogin ? "register" : "login"));

  const modalBody = isLogin ? (
    <>
      <Typography variant="h5">Sign in</Typography>
      <Login />
      <SwitchOption text={"Sign up"} onClick={handlePageChange} />
    </>
  ) : (
    <>
      <Typography variant="h5">Sign up</Typography>
      <Register />
      <SwitchOption text={"Sign in"} onClick={handlePageChange} />
    </>
  );

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={handleClose}
      BackdropComponent={Backdrop}
    >
      <div className={styles.container}>
        <Paper classes={{ root: styles.paperRoot }}>
          {error ? <Alert severity="warning">{error}</Alert> : null}
          {modalBody}
        </Paper>
      </div>
    </Modal>
  );
}
