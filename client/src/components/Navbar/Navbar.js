import React from "react";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Logo from "./Logo";
import { algorithms } from "../DataForm/forms";
import { useDispatch, useSelector } from "react-redux";
import {
  getChosenAlgorithmName,
  getIsSidebarToggled,
  toggleSidebar,
} from "../../redux/ui/uiSlice";
import { getIsAuthenticated, getsUsername } from "../../redux/user/userSlice";
import LogoutButton from "./LogoutButton";
import { getStrategy } from "../../redux/user/userSlice";
import GoogleLogin from "./GoogleLogin";
import GoogleLogout from "./GoogleLogout";
import { getGreeting } from "../../lib/utils";
import Loader from "../Loader";
import { getIsStartedStoppedFinished } from "../../redux/player/playerSlice";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.primary.main,
      minHeight: theme.navbarHeight.minHeight,
    },

    title: {
      flexGrow: 1,
      marginLeft: "5em",
      color: theme.palette.lightWhite,
      [theme.breakpoints.down("sm")]: {
        marginLeft: "1em",
      },
    },
    paper: {
      backgroundColor: "#1D1D1F",
      width: "300px",
    },
    sideBarDivider: {
      backgroundColor: "#F5F5F7",
      width: "80%",
    },
  };
});

export default function Navbar() {
  const styles = useStyles();
  const dispatch = useDispatch();
  const toggle = useSelector(getIsSidebarToggled);
  const algo = useSelector(getChosenAlgorithmName);
  const isAuth = useSelector(getIsAuthenticated);
  const strategy = useSelector(getStrategy);
  const username = useSelector(getsUsername);
  const { isStarted, isFinished } = useSelector(getIsStartedStoppedFinished);

  const handleSidebarToggle = (option) => () => dispatch(toggleSidebar(option));

  const strategyButtons = {
    local: {
      logout: <LogoutButton />,
    },
    google: {
      logout: <GoogleLogout />,
    },
  };

  // AppBar is the header tag.
  return (
    <AppBar>
      <Toolbar classes={{ root: styles.root }}>
        <Logo />
        <Typography variant="h6" className={styles.title}>
          {algo !== "_NONE" ? (
            <>
              {algorithms[algo].label}{" "}
              {isStarted && !isFinished ? <Loader size={20} /> : null}
            </>
          ) : (
            `${getGreeting()}${username}`
          )}
        </Typography>
        <Hidden xsDown>
          {!isAuth ? (
            <Hidden>
              <LoginButton />
              <RegisterButton />
              <GoogleLogin />
            </Hidden>
          ) : (
            strategyButtons[strategy].logout
          )}
        </Hidden>
        <Hidden smUp>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleSidebarToggle(true)}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <div className="sideBar" onClick={handleSidebarToggle(false)}>
          <Drawer
            open={toggle}
            anchor={"right"}
            classes={{ paper: styles.paper }}
            onClose={handleSidebarToggle(false)}
          >
            <List>
              {!isAuth ? (
                <>
                  <ListItem button>
                    <LoginButton />
                  </ListItem>
                  <Divider
                    classes={{ root: styles.sideBarDivider }}
                    variant="middle"
                  />
                  <ListItem button>
                    <RegisterButton />
                  </ListItem>
                </>
              ) : (
                <>
                  <ListItem button>{strategyButtons[strategy].logout}</ListItem>
                  <Divider
                    classes={{ root: styles.sideBarDivider }}
                    variant="middle"
                  />
                </>
              )}
            </List>
          </Drawer>
        </div>
      </Toolbar>
    </AppBar>
  );
}
