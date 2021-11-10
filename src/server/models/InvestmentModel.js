import mongoose from "mongoose";
import Farm from "../models/FarmModel.js";

const InvestmentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  farm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Farm",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Active", "Completed"],
    default: "Pending",
  },
  unit: {
    type: Number,
  },
  amount: {
    type: Number,
  },
  maturityStatus: {
    type: Boolean,
    default: false,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  // returnOfInvestment: {},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

InvestmentSchema.pre(/^(save)/, async function () {
  let self = this;
  const farm = await Farm.findById(self.farm);
  const amount = farm.amount * self.unit;
  self.amount = amount;
});

const Investment = mongoose.model("Investment", InvestmentSchema);
export default Investment;
