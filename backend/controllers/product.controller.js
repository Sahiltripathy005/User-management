// controllers/product.controller.js

import { Product } from "../models/product.model.js";

// GET all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching products",
    });
  }
};

// GET single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res
        .status(404)
        .json({ message: "Not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching product",
    });
  }
};

// CREATE product (admin)
export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();

    res.json(saved);
  } catch (err) {
    res.status(500).json({
      message: "Error creating product",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({
      message: "Update failed",
    });
  }
};

export const deleteProduct = async (
req,
res
) => {
try {
await Product.findByIdAndDelete(
req.params.id
);

res.json({
  message: "Deleted successfully",
});

} catch (err) {
res.status(500).json({
message: "Delete failed",
});
}
};