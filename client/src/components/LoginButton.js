import React from "react";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { openAuthModal } from "../redux/ui/uiSlice";

export default function LoginButton({ className = "", ...rest }) {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(openAuthModal());
  return (
    <Button className={className} {...rest} onClick={handleClick}>
      Sign In
    </Button>
  );
}
