import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loader({ color = "inherit" }) {
  return <CircularProgress color={color} />;
}
