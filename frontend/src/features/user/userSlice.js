import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getUsersAPI,
  addUserAPI,
  deleteUserAPI,
  updateUserAPI
} from "./userAPI";


export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async ()=>{
        return await getUsersAPI();
    }
)

export const addUser = createAsyncThunk(
  "users/addUser",
  async (user) => {
    return await addUserAPI(user);
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id) => {
    await deleteUserAPI(id);
    return id;
  }
);

export const editUser = createAsyncThunk(
  "users/editUser",
  async ({ id, data }) => {
    const updatedUser = await updateUserAPI(
      id,
      data
    );

    return updatedUser;
  }
);

const userSlice = createSlice({
    name : "users",
    initialState:{
        users:[],
        loading : false , 
        error: null,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        })
        .addCase(fetchUsers.rejected, (state) => {
            state.loading = false;
            state.error = "Error fetching users";
        })

        // add
        .addCase(addUser.fulfilled, (state, action) => {
            state.users.push(action.payload);
        })
        // delete
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.users = state.users.filter(
            (u) => u._id !== action.payload
            );
        })
        .addCase(editUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;

        state.users = state.users.map((u) =>
          u._id === updatedUser._id ? updatedUser : u
        );
      })
    },
})

export default userSlice.reducer;