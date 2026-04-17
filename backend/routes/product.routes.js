// routes/product.routes.js

import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
} from "../controllers/product.controller.js";
import { updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);       
router.get("/:id", getProductById); 
router.post("/", createProduct);   
router.put("/:id", updateProduct);


export default router;