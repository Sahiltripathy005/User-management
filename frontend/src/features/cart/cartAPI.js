
const BASE_URL =
    "http://localhost:5000/api/v1/cart";

export const getCartAPI =
    async () => {
        const res =
            await fetch(
                BASE_URL,
                {
                    credentials:
                        "include",
                }
            );

        return await res.json();
    };

export const addToCartAPI =
    async (
        productId
    ) => {
        const res =
            await fetch(
                BASE_URL,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    credentials:
                        "include",
                    body:
                        JSON.stringify(
                            {
                                productId,
                            }
                        ),
                }
            );

        return await res.json();
    };

export const updateCartAPI =
    async (
        id,
        quantity
    ) => {
        const res =
            await fetch(
                `${BASE_URL}/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    credentials:
                        "include",
                    body:
                        JSON.stringify(
                            {
                                quantity,
                            }
                        ),
                }
            );

        return await res.json();
    };

export const removeCartAPI =
    async (id) => {
        const res =
            await fetch(
                `${BASE_URL}/${id}`,
                {
                    method:
                        "DELETE",
                    credentials:
                        "include",
                }
            );

        return await res.json();
    };