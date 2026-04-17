// features/product/productSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProductsAPI,
  fetchProductByIdAPI,
  createProductAPI 
} from "./productAPI";


// THUNKS

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    return await fetchProductsAPI();
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id) => {
    return await fetchProductByIdAPI(id);
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (data) => {
    return await createProductAPI(data);
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, data }) => {
    const res = await fetch(
      `http://localhost:5000/api/v1/products/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      throw new Error("Update failed");
    }

    return await res.json(); 
  }
);

// SLICE

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // GET ALL
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      })

      // GET ONE
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      })

      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })

      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
            (p) => p._id === action.payload._id
        );

        if (index !== -1) {
            state.products[index] = action.payload;
        }
      });
  },
});

export default productSlice.reducer;