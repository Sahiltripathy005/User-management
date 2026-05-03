import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import {
    getCartAPI,
    addToCartAPI,
    updateCartAPI,
    removeCartAPI,
} from "./cartAPI";



export const fetchCart =
    createAsyncThunk(
        "cart/fetch",
        async () => {
            return await getCartAPI();
        }
    );

export const addToCart =
    createAsyncThunk(
        "cart/add",
        async (
            productId
        ) => {
            return await addToCartAPI(
                productId
            );
        }
    );

export const updateCartQuantity =
    createAsyncThunk(
        "cart/update",
        async ({
            id,
            quantity,
        }) => {
            return await updateCartAPI(
                id,
                quantity
            );
        }
    );

export const removeFromCart =
    createAsyncThunk(
        "cart/remove",
        async (id) => {
            await removeCartAPI(
                id
            );
            return id;
        }
    );

const cartSlice =
    createSlice({
        name: "cart",

        initialState: {
            items: [],
            loading: false,
        },

        reducers: {},

        extraReducers:
            (builder) => {
                builder

                    .addCase(
                        addToCart.fulfilled,
                        (
                            state,
                            action
                        ) => {
                            const existing =
                                state.items.find(
                                    (item) =>
                                        item._id ===
                                        action.payload._id
                                );

                            if (existing) {
                                existing.quantity = action.payload.quantity;
                            } else {
                                state.items.push(action.payload);
                            }
                        }
                    )

                    .addCase(
                        updateCartQuantity.fulfilled,
                        (
                            state,
                            action
                        ) => {
                            const index = state.items.findIndex(
                                (item) =>
                                    item._id ===
                                    action.payload._id
                            );

                            if (
                                index !== -1
                            ) {
                                state.items[index] = action.payload;
                            }
                        }
                    )

                    .addCase(
                        removeFromCart.fulfilled,
                        (
                            state,
                            action
                        ) => {
                            state.items =
                                state.items.filter(
                                    (
                                        item
                                    ) =>
                                        item._id !==
                                        action.payload
                                );
                        }
                    ).addCase(
                        fetchCart.pending,
                        (state) => {
                            state.loading =
                                true;
                        }
                    )

                    .addCase(
                        fetchCart.fulfilled,
                        (
                            state,
                            action
                        ) => {
                            state.loading =
                                false;
                            state.items =
                                action.payload;
                        }
                    )

                    .addCase(
                        fetchCart.rejected,
                        (state) => {
                            state.loading =
                                false;
                        }
                    )
            },
    });

export default
    cartSlice.reducer;