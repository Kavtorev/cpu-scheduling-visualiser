import React from "react";
import Button from "@material-ui/core/Button";
import { openAuthModal } from "../redux/ui/uiSlice";
import { useDispatch } from "react-redux";
export default function RegisterButton({ className = "", ...rest }) {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(openAuthModal("register"));
  return (
    <Button className={className} {...rest} onClick={handleClick}>
      Sign Up
    </Button>
  );
}
