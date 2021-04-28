import { Typography } from "@material-ui/core";
import LockOpenRoundedIcon from "@material-ui/icons/LockOpenRounded";
import React from "react";

const styles = {
  heigth: "100%",
  display: "flex",
  flexDirection: "row",
  alignContent: "center",
  justifyContent: "center",
  paddingTop: "3em",
};

export default function FriendlyBanner() {
  return (
    <div style={styles}>
      <LockOpenRoundedIcon />
      <Typography>Please Log in</Typography>
    </div>
  );
}
