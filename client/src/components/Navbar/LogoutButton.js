import React from "react";
import { useDispatch } from "react-redux";
import { logOutAsync } from "../../redux/user/userSlice";
import AuthButton from "../AuthButton";

export default function LogoutButton() {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(logOutAsync());
  return <AuthButton text="Sign out" onClick={handleClick} />;
}
