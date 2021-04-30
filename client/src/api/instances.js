import axiosGoogle from "./google";
import axiosLocal from "./local";

export const instances = {
  local: axiosLocal,
  google: axiosGoogle,
};
