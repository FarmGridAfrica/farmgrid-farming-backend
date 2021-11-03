import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const PlanSchema = mongoose.Schema({
  planName: {
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
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
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

PlanSchema.pre(/^(save)/, function () {
  let self = this;
  const startDate = self.startDate;
  const endDate = self.endDate;
  const diffTime = Math.abs(endDate - startDate);
  self.duration = diffTime;
});

const Plan = mongoose.model("Plan", PlanSchema);
export default Plan;
