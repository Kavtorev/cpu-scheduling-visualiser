import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loader({ color = "inherit", ...rest }) {
  return <CircularProgress color={color} {...rest} />;
}
