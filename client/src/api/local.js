import axios from "axios";
import { extractTokenMetaFromConfig } from "./common";
import { isJWTExpired } from "../lib/jwt";
import { API_BASE } from "./constants";
import { protectLocalInstance, unprotectInstance } from "./interceptors";

const axiosLocalAuth = axios.create();

export const refreshSilentlyAsync = async () => {
  const { user } = (await axiosLocalAuth.get("/refresh")).data;
  return Promise.resolve(user);
};

axiosLocalAuth.interceptors.response.use(protectLocalInstance(axiosLocalAuth));

axiosLocalAuth.interceptors.request.use(async function (config) {
  if (config.url.startsWith(API_BASE)) {
    const { token, exp } = extractTokenMetaFromConfig(config);

    if (token && isJWTExpired(exp)) {
      try {
        const token = (await refreshSilentlyAsync()).jwt;
        config.headers.common["authorization"] = `Bearer ${token}`;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
  return config;
});

axiosLocalAuth.interceptors.response.use(unprotectInstance(axiosLocalAuth));

export default axiosLocalAuth;
