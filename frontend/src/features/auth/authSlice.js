import {
createSlice,
createAsyncThunk,
} from "@reduxjs/toolkit";

import {
signupAPI,
loginAPI,
logoutAPI,
getProfileAPI,
} from "./authAPI";


export const signupUser =
createAsyncThunk(
"auth/signup",
async (data) => {
return await signupAPI(
data
);
}
);

export const loginUser =
createAsyncThunk(
"auth/login",
async (data) => {
return await loginAPI(
data
);
}
);

export const logoutUser =
createAsyncThunk(
"auth/logout",
async () => {
return await logoutAPI();
}
);

export const fetchProfile =
createAsyncThunk(
"auth/profile",
async () => {
  return await getProfileAPI();
}
);

const authSlice =
createSlice({
name: "auth",

 
initialState: {
  user: null,
  isAuthenticated: false,
  loading: true,
},

reducers: {},

extraReducers:
  (builder) => {
    builder
      .addCase(
        loginUser.fulfilled,
        (
          state,
          action
        ) => {
          state.user =
            action.payload.user;

          state.isAuthenticated =
            true;
        }
      )

      .addCase(
        logoutUser.fulfilled,
        (state) => {
          state.user =
            null;

          state.isAuthenticated =
            false;

        }
      )

      .addCase(
        fetchProfile.fulfilled,
        (state, action) => {
          state.user =
            action.payload;

          state.isAuthenticated =
            true;

          state.loading = false;
        }
      )
      .addCase(
      fetchProfile.pending,
      (state) => {
        state.loading = true;
      }
    )
      .addCase(
      fetchProfile.rejected,
      (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      }
    )
  },
 

});

export default
authSlice.reducer;
