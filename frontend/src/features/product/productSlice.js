import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  fetchProductsAPI,
  fetchProductByIdAPI,
  createProductAPI,
  updateProductAPI,
  deleteProductAPI,
} from "./productAPI";

export const fetchProducts =
  createAsyncThunk(
    "products/fetchProducts",
    async () => {
      return await fetchProductsAPI();
    }
  );

export const fetchProductById =
  createAsyncThunk(
    "products/fetchById",
    async (id) => {
      return await fetchProductByIdAPI(
        id
      );
    }
  );

export const createProduct =
  createAsyncThunk(
    "products/createProduct",
    async (data) => {
      return await createProductAPI(
        data
      );
    }
  );

export const editProduct =
  createAsyncThunk(
    "products/editProduct",
    async ({
      id,
      data,
    }) => {
      return await updateProductAPI(
        id,
        data
      );
    }
  );

export const deleteProduct =
  createAsyncThunk(
    "products/deleteProduct",
    async (id) => {
      await deleteProductAPI(id);
      return id;
    }
  );

const productSlice =
  createSlice({
    name: "products",


    initialState: {
      products: [],
      selectedProduct:
        null,
      loading: false,
    },

    reducers: {},

    extraReducers:
      (builder) => {
        builder
          .addCase(
            fetchProducts.pending,
            (state) => {
              state.loading =
                true;
            }
          )

          .addCase(
            fetchProducts.fulfilled,
            (
              state,
              action
            ) => {
              state.loading =
                false;

              state.products =
                action.payload;
            }
          )

          .addCase(
            fetchProducts.rejected,
            (state) => {
              state.loading =
                false;
            }
          )

          .addCase(
            fetchProductById.fulfilled,
            (
              state,
              action
            ) => {
              state.selectedProduct =
                action.payload;
            }
          )

          .addCase(
            createProduct.fulfilled,
            (
              state,
              action
            ) => {
              state.products.push(
                action.payload
              );
            }
          )

          .addCase(
            editProduct.fulfilled,
            (
              state,
              action
            ) => {
              const index =
                state.products.findIndex(
                  (p) =>
                    p._id ===
                    action
                      .payload
                      ._id
                );

              if (
                index !== -1
              ) {
                state.products[
                  index
                ] =
                  action.payload;
              }
            }
          )

          .addCase(
            deleteProduct.fulfilled,
            (
              state,
              action
            ) => {
              state.products =
                state.products.filter(
                  (p) =>
                    p._id !==
                    action.payload
                );
            }
          );
      },


  });

export default
  productSlice.reducer;
