import React from "react";
import AuthButton from "./AuthButton";
export default function RegisterButton({ className = "", ...rest }) {
  return <AuthButton text="Sign Up" modalPage="register" />;
}
