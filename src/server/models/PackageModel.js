import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const PackageSchema = mongoose.Schema({
  packageName: {
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
  products: [
    {
      type: String,
      required: false,
    },
  ],
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  returnOfInvestment: {
    type: String,
  },
  amount: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Package = mongoose.model("Package", PackageSchema);
export default Package;
