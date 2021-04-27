import React, { memo } from "react";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import { useSelector } from "react-redux";
import { getVisualizations } from "../redux/ui/uiSlice";
import VisualizationItem from "./VisualizationItem";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";
import PaperHeader from "./PaperHeader";
import { getIsAuthenticated } from "../redux/user/userSlice";
import FriendlyBanner from "../components/FriendlyBanner";

const useStyles = makeStyles((theme) => ({
  boxRoot: {
    backgroundColor: "#215B90",
    color: "#F5F5F7",
  },
}));

export default memo(function VisualizationsList() {
  const vis = useSelector(getVisualizations);
  const styles = useStyles();
  const isAuth = useSelector(getIsAuthenticated);
  return (
    <List disablePadding={true}>
      <ListSubheader disableGutters={true}>
        <Box classes={{ root: styles.boxRoot }}>
          <PaperHeader>Your visualizations</PaperHeader>
        </Box>
      </ListSubheader>
      {isAuth ? (
        vis.map((e) => {
          return <VisualizationItem key={e.id} name={e.name} />;
        })
      ) : (
        <FriendlyBanner />
      )}
    </List>
  );
});
