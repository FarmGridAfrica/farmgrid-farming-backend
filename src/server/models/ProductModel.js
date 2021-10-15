import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const ProductSchema = mongoose.Schema({
  productName: {
    type: String,
    required: false,
  },
  photo: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
