import React, { memo } from "react";
import {
  GridFilterToolbarButton,
  GridDensitySelector,
  GridToolbarExport,
} from "@material-ui/data-grid";
import PublishOutlinedIcon from "@material-ui/icons/PublishOutlined";
import Button from "@material-ui/core/Button";
import { Menu, MenuItem } from "@material-ui/core";
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";
import { useDispatch, useSelector } from "react-redux";
import {
  getRowsLength,
  getRows,
  getChosenAlgorithmName,
  createVisualisationAsync,
  updateVisualisationAsync,
  getSavedId,
  getCrudStatus,
} from "../../redux/ui/uiSlice";
import { getIsAuthenticated, getStrategy } from "../../redux/user/userSlice";
import uniqid from "uniqid";

function GridToolBarImport() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        aria-controls="import-csv"
        aria-haspopup="true"
        aria-label="Upload data"
        size="small"
        onClick={handleClick}
      >
        <PublishOutlinedIcon />
        Import
      </Button>
      <Menu
        id="import-csv"
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>Upload CSV</MenuItem>
      </Menu>
    </>
  );
}

function GridToolBarSave() {
  const dispatch = useDispatch();
  const rLen = useSelector(getRowsLength);
  const data = useSelector(getRows);
  const type = useSelector(getChosenAlgorithmName);
  const strategy = useSelector(getStrategy);
  const name = `Visualisation id: ${uniqid.time()}`;
  const _id = useSelector(getSavedId);
  const crudStatus = useSelector(getCrudStatus);
  const handleClick = () => {
    if (rLen) {
      if (!_id) {
        dispatch(
          createVisualisationAsync({
            body: {
              name,
              data,
              type,
            },
            strategy,
          })
        );
      } else {
        dispatch(
          updateVisualisationAsync({
            _id,
            body: {
              data,
            },
            strategy,
          })
        );
      }
    }
  };
  return (
    <Button
      aria-controls="save-input"
      aria-haspopup="true"
      aria-label="Save input"
      size="small"
      onClick={handleClick}
      disabled={crudStatus === "loading"}
    >
      <SaveRoundedIcon />
      {!_id ? "Save" : "Save Updates"}
    </Button>
  );
}

export default memo(function GridToolbarPredefinedOptions() {
  const isAuth = useSelector(getIsAuthenticated);
  return (
    <>
      <GridDensitySelector />
      {/* <GridToolbarExport /> */}
      {/* <GridToolBarImport /> */}
      <GridFilterToolbarButton />
      {isAuth ? <GridToolBarSave /> : null}
    </>
  );
});
