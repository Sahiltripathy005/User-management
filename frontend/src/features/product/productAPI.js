const BASE_URL =
  "http://localhost:5000/api/v1/products";

// GET all products
export const fetchProductsAPI =
  async () => {
    const res =
      await fetch(
        BASE_URL
      );

    if (!res.ok) {
      throw new Error(
        "Failed to fetch products"
      );
    }

    return await res.json();
  };

// GET single product
export const fetchProductByIdAPI =
  async (id) => {
    const res =
      await fetch(
        `${BASE_URL}/${id}`
      );

    if (!res.ok) {
      throw new Error(
        "Failed to fetch product"
      );
    }

    return await res.json();
  };

// CREATE product
export const createProductAPI =
  async (data) => {
    const res =
      await fetch(
        BASE_URL,
        {
          method:
            "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body:
            JSON.stringify(
              data
            ),
        }
      );

    if (!res.ok) {
      throw new Error(
        "Failed to create product"
      );
    }

    return await res.json();
  };

// UPDATE product
export const updateProductAPI =
  async (
    id,
    data
  ) => {
    const res =
      await fetch(
        `${BASE_URL}/${id}`,
        {
          method:
            "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body:
            JSON.stringify(
              data
            ),
        }
      );

    if (!res.ok) {
      throw new Error(
        "Update failed"
      );
    }

    return await res.json();
  };

// DELETE product
export const deleteProductAPI =
  async (id) => {
    const res =
      await fetch(
        `${BASE_URL}/${id}`,
        {
          method:
            "DELETE",
        }
      );

    if (!res.ok) {
      throw new Error(
        "Delete failed"
      );
    }

    return id;
  };