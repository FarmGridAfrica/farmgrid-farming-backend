import express from "express";
const router = express.Router();

import {
  createProduct,
  updateProduct,
  deleteSingleProduct,
  getProducts,
  getSingleProduct,
} from "../controllers/product.js";

router.post("/create", createProduct);
router.put("/:productId", updateProduct);
router.get("/", getProducts);
router.get("/:productId", getSingleProduct);
router.delete("/:productId", deleteSingleProduct);

export default router;
