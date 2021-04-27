import {
  LOGIN_ROUTE,
  LOGIN_GOOGLE_ROUTE,
  LOGOUT_ROUTE,
  LOGOUT_GOOGLE_ROUTE,
  REFRESH_TOKEN_ROUTE,
  REGISTER_ROUTE,
} from "./constants";
import { attachTokenToInstance, detachTokenFromInstance } from "./common";
import { decodeTokenPayload } from "../lib/jwt";
import { getStrategy, revertStrategy, setStrategy } from "../lib/browser";

export const protectInstance = (instance) => (response) => {
  const { url } = response.config;
  if (
    [
      LOGIN_GOOGLE_ROUTE,
      LOGIN_ROUTE,
      REFRESH_TOKEN_ROUTE,
      REGISTER_ROUTE,
    ].includes(url)
  ) {
    const { token, strategy = getStrategy() } = response.data;

    if (!token) {
      return Promise.reject("Invalid token");
    }
    const { id, name, jwt } = decodeTokenPayload(token);
    attachTokenToInstance(instance, jwt.token, jwt.exp);
    response.data.user = { id, name, jwt: jwt.token, strategy };
    setStrategy(strategy);
  }
  return response;
};

export const unprotectInstance = (instance) => (response) => {
  const { url } = response.config;
  if ([LOGOUT_ROUTE, LOGOUT_GOOGLE_ROUTE].includes(url)) {
    detachTokenFromInstance(instance);
    revertStrategy();
  }
  return response;
};
