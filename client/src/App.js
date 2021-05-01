import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./globalTheme";
import BaseLayout from "./containers/BaseLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthModal from "./components/AuthModal";
import { getAuthStatus, refreshAsync } from "./redux/user/userSlice";
import { initStrategyTracker, isLocalStrategy } from "./lib/browser";
import { useDispatch, useSelector } from "react-redux";
import { Backdrop } from "@material-ui/core";
import Loader from "./components/Loader";

function App() {
  const dispatch = useDispatch();
  const authStatus = useSelector(getAuthStatus);
  useEffect(() => initStrategyTracker(), []);

  useEffect(() => {
    if (isLocalStrategy()) {
      dispatch(refreshAsync());
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <BaseLayout />
      <ToastContainer style={{ width: "400px" }} />
      <AuthModal />
      <Backdrop
        style={{ color: "#fff", zIndex: 9999 }}
        open={authStatus === "loading"}
      >
        <Loader />
      </Backdrop>
    </ThemeProvider>
  );
}

export default App;
