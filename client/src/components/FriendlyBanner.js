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

export default function FriendlyBanner({ children }) {
  console.log("CHILDREN:", children);
  if (!children)
    children = (
      <>
        <LockOpenRoundedIcon />
        <Typography>Please Log in</Typography>
      </>
    );
  return <div style={styles}>{children}</div>;
}
