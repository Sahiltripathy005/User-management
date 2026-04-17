import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice"
import productReducer from "../features/product/productSlice";

export const store = configureStore({
  reducer: {
    users:userReducer,
    products: productReducer,
    // will add slices here later
  },
});