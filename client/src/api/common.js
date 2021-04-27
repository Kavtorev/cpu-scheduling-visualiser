export const extractTokenMetaFromConfig = (config) => {
  const token = config.headers.common["authorization"].split(" ")[1];
  const exp = config.auth.exp;
  return { token, exp };
};

export const attachTokenToInstance = (instance, token, exp) => {
  instance.defaults.headers.common["authorization"] = `Bearer ${token}`;
  instance.defaults.auth = { exp };
};

export const detachTokenFromInstance = (instance) => {
  instance.defaults.headers.common["authorization"] = null;
  instance.defaults.auth = null;
};
