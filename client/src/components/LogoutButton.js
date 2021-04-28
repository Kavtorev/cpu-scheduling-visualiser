import React from "react";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { logOutAsync } from "../redux/user/userSlice";

export default function LogoutButton({ className = "", ...rest }) {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(logOutAsync());
  return (
    <Button className={className} {...rest} onClick={handleClick}>
      Logout
    </Button>
  );
}
