import Paper from "@material-ui/core/Paper";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import VisualizationsList from "./VisualizationsList";
import PaperHeader from "./PaperHeader";

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    height: "40vh",
    overflow: "auto",
    borderTop: "3px solid #1D1D1F",
    padding: theme.dataGridPadding.padding,
  },
}));

export default function VisualizationsBoard() {
  const styles = useStyles();
  return (
    <Paper classes={{ root: styles.paperRoot }}>
      <PaperHeader>Your visualizations</PaperHeader>
      <VisualizationsList />
    </Paper>
  );
}
