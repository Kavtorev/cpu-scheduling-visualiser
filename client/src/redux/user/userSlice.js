import axios from "axios";
import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import axiosLocalAuth, { refreshSilentlyAsync } from "../../api/local";
import {
  LOGIN_ROUTE,
  LOGOUT_ROUTE,
  REGISTER_ROUTE,
  LOGIN_GOOGLE_ROUTE,
  UPDATE_PROFILE_ROUTE,
  LOGOUT_GOOGLE_ROUTE,
} from "../../api/constants";

const initialState = {
  id: -1,
  name: "",
  isAuthenticated: false,
  status: "idle",
  error: "",
  strategy: "unauthorized",
  extra: {},
};

// constants

// Actions

// Thunks

// createThunk - runs the promise callback and dispatches the lifecycle actions based on the returned promise. The second argument or a payloadCreator should return either a promise containing a result or a value.

export const googleLoginAsync = createAsyncThunk(
  "user/googLogIn",
  async ({ tokenId, profileObj }, { rejectWithValue }) => {
    try {
      const data = (
        await axios.post(
          LOGIN_GOOGLE_ROUTE,
          { tokenId },
          {
            headers: {
              "Content-type": "application/json",
              authorization: `Bearer ${tokenId}`,
            },
          }
        )
      ).data;
      const { name, imageUrl } = profileObj;
      return { id: data.id, name, imageUrl };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const googleLogoutAsync = createAsyncThunk(
  "user/googLogOut",
  async () => {
    await axiosLocalAuth.get(LOGOUT_GOOGLE_ROUTE);
    return Promise.resolve("loggged out");
  }
);

export const refreshAsync = createAsyncThunk(
  "user/refresh",
  refreshSilentlyAsync
);

export const logInAsync = createAsyncThunk(
  "user/logIn",
  async (data, { rejectWithValue }) => {
    try {
      const { user } = (await axiosLocalAuth.post(LOGIN_ROUTE, data)).data;
      return user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerAsync = createAsyncThunk(
  "user/reg",
  async (data, { rejectWithValue }) => {
    try {
      const { user } = (await axiosLocalAuth.post(REGISTER_ROUTE, data)).data;
      return user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateNameAsync = createAsyncThunk(
  "user/profile",
  async (data, { rejectWithValue }) => {
    try {
      const { username } = (
        await axiosLocalAuth.put(UPDATE_PROFILE_ROUTE, data)
      ).data;
      return username;
    } catch (error) {
      console.log("ERROR", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const logOutAsync = createAsyncThunk("user/logOut", async (data) => {
  await axiosLocalAuth.get(LOGOUT_ROUTE);
  return data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fulfilled starts here
      .addCase(googleLoginAsync.fulfilled, (state, action) => {
        state.extra.imageUrl = action.payload.imageUrl;
      })
      .addCase(googleLogoutAsync.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(logOutAsync.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(updateNameAsync.fulfilled, (state, action) => {
        state.name = action.payload;
        state.status = "success";
      })
      .addMatcher(
        isAnyOf(logOutAsync.fulfilled, googleLogoutAsync.fulfilled),
        (state, action) => {
          state.id = -1;
          state.name = "";
          state.isAuthenticated = false;
          state.extra = {};
          state.strategy = "unauthorized";
          state.error = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(
          logInAsync.fulfilled,
          registerAsync.fulfilled,
          refreshAsync.fulfilled,
          googleLoginAsync.fulfilled
        ),
        (state, action) => {
          const { id, name, strategy } = action.payload;
          state.id = id;
          state.name = name;
          state.isAuthenticated = true;
          state.status = "success";
          state.strategy = strategy;
        }
      )
      // pending starts here
      .addMatcher(
        isAnyOf(
          logInAsync.pending,
          registerAsync.pending,
          refreshAsync.pending,
          logOutAsync.pending,
          updateNameAsync.pending,
          googleLoginAsync.pending,
          googleLogoutAsync.pending
        ),
        (state, action) => {
          state.status = "loading";
          state.error = "";
        }
      )
      // rejected starts here
      .addMatcher(
        isAnyOf(
          logInAsync.rejected,
          registerAsync.rejected,
          refreshAsync.rejected,
          updateNameAsync.rejected,
          googleLoginAsync.rejected,
          googleLogoutAsync.rejected
        ),
        (state, action) => {
          state.status = "error";
          state.error = action.payload?.message;
        }
      );
  },
});

// Exports start here
// Selectors
export const getIsAuthenticated = (state) => state.user.isAuthenticated;
export const getAuthStatus = (state) => state.user.status;
export const getErrorMessage = (state) => state.user.error;
export const getIsError = (state) => !!state.user.error;
export const getIsLocalStrategy = (state) => state.user.strategy === "local";

// Actions

// Reducer/s

export default userSlice.reducer;
