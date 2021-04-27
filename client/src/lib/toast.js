import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { unwrapResult } from "@reduxjs/toolkit";

export const notify = (text = "Great!") =>
  toast.success(`🦄 ${text}`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

// use only with the requests with an embedded jwt

// export const reponseWithToast = async (promise, dispatch, customText = "") => {
//   try {
//     const resultAction = await promise;
//     const payload = await unwrapResult(resultAction);
//     notify(customText ? customText + payload : "");
//   } catch (error) {
//     dispatch(forcelogOutAction("Your session has been expired"));
//   }
// };
