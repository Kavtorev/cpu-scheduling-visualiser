import React, { memo, useEffect } from "react";
import List from "@material-ui/core/List";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteVisualisationAsync,
  getVisualisationDataById,
  getVisualisationsAsync,
  getVisualizations,
} from "../redux/ui/uiSlice";
import VisualizationItem from "./VisualizationItem";
import { getIsAuthenticated, getStrategy } from "../redux/user/userSlice";
import FriendlyBanner from "../components/FriendlyBanner";

export default memo(function VisualizationsList() {
  const vis = useSelector(getVisualizations);
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuthenticated);
  const strategy = useSelector(getStrategy);

  useEffect(() => {
    if (isAuth) {
      dispatch(getVisualisationsAsync(strategy));
    }
  }, [isAuth, dispatch, strategy]);

  const handleListButtonClick = (e) => {
    dispatch(getVisualisationDataById({ _id: e.currentTarget.id, strategy }));
  };

  const handleTrashClick = (e) => {
    dispatch(deleteVisualisationAsync({ _id: e.currentTarget.id, strategy }));
  };

  if (!isAuth) {
    return <FriendlyBanner />;
  }

  return (
    <List disablePadding={true}>
      {vis.map((e) => {
        return (
          <VisualizationItem
            key={e._id}
            id={e._id}
            name={e.name}
            handleListButtonClick={handleListButtonClick}
            handleTrashClick={handleTrashClick}
          />
        );
      })}
    </List>
  );
});
