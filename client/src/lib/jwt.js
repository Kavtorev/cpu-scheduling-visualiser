import jwt_decode from "jwt-decode";

export const isJWTExpired = (expTime) => {
  return expTime && expTime - 10 < Math.floor(Date.now().valueOf() / 1000)
    ? true
    : false;
};

export const getTokenExp = (token) => {
  return jwt_decode(token).exp;
};

export function decodeTokenPayload(token) {
  const { id, name, exp } = jwt_decode(token);
  return {
    id,
    name,
    jwt: { token, exp },
  };
}
