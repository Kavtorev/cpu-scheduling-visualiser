import axios from "axios";
import { protectGoogleInstance, unprotectInstance } from "./interceptors";

const axiosGoogle = axios.create();

axiosGoogle.interceptors.response.use(protectGoogleInstance(axiosGoogle));
axiosGoogle.interceptors.response.use(unprotectInstance(axiosGoogle));

export default axiosGoogle;
