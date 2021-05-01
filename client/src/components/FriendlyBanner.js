import { Typography } from "@material-ui/core";
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
  if (!children)
    children = (
      <>
        <Typography>Please, Sign In.</Typography>
      </>
    );
  return <div style={styles}>{children}</div>;
}
