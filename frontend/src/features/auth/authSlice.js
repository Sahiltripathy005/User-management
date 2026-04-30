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

const storedUser =
JSON.parse(
localStorage.getItem(
"user"
)
) || null;

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
async (id) => {
return await getProfileAPI(
id
);
}
);

const authSlice =
createSlice({
name: "auth",

 
initialState: {
  user: storedUser,
  isAuthenticated:
    !!storedUser,
  loading: false,
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

          localStorage.setItem(
            "user",
            JSON.stringify(
              action.payload.user
            )
          );
        }
      )

      .addCase(
        logoutUser.fulfilled,
        (state) => {
          state.user =
            null;

          state.isAuthenticated =
            false;

          localStorage.removeItem(
            "user"
          );
        }
      )

      .addCase(
        fetchProfile.fulfilled,
        (
          state,
          action
        ) => {
          state.user =
            action.payload;
        }
      );
  },
 

});

export default
authSlice.reducer;
