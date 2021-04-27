import { Typography } from "@material-ui/core";
import LockOpenRoundedIcon from "@material-ui/icons/LockOpenRounded";
import React from "react";

const styles = {
  heigth: "100%",
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  justifyContent: "center",
};

export default function FriendlyBanner() {
  return (
    <div style={styles}>
      <LockOpenRoundedIcon />
      <Typography variant="h5">Please Log in</Typography>
    </div>
  );
}
