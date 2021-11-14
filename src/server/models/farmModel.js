import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const FarmSchema = mongoose.Schema({
  farmName: {
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
  country: {
    type: String,
    required: false,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  duration: {
    type: Number,
  },
  annualPercentageYield: {
    type: Number,
  },
  amount: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Farm = mongoose.model("Farm", FarmSchema);
export default Farm;
