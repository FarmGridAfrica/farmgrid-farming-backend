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
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  duration: {
    type: Number,
  },
  returnOfInvestment: {
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

FarmSchema.pre(/^(save)/, function () {
  let self = this;
  const startDate = self.startDate;
  const endDate = self.endDate;
  const diffTime = Math.abs(endDate - startDate);
  self.duration = diffTime;
});

const Farm = mongoose.model("Farm", FarmSchema);
export default Farm;
