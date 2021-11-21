import mongoose from "mongoose";
import Farm from "./FarmModel.js";

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
    enum: ["Withdrawn", "Active", "Completed"],
    default: "Active",
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
  dollarEquivalent: {
    type: Number,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  expectedReturn: {
    type: Number,
  },
  expectedReturnDollar: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

InvestmentSchema.pre(/^(save)/, async function () {
  let self = this;
  let amount;
  let dollarValue;

  const farm = await Farm.findById(self.farm);

  amount = farm.amount * self.unit;

  let exprtn = amount * (farm.annualPercentageYield * 0.01);
  let exprtndol;

  if (farm.country == "Kenya") {
    dollarValue = Math.round(amount * 0.0089);
    exprtndol = Math.round(exprtn * 0.0089);
  } else if (farm.country == "Nigeria") {
    dollarValue = Math.round(amount * 0.0024);
    exprtndol = Math.round(exprtn * 0.0024);
  } else {
    dollarValue = Math.round(amount * 0.066);
    exprtndol = Math.round(exprtn * 0.066);
  }

  self.expectedReturn = amount + exprtn;
  self.expectedReturnDollar = dollarValue + exprtndol;
  self.amount = amount;
  self.dollarEquivalent = dollarValue;
});

const Investment = mongoose.model("Investment", InvestmentSchema);
export default Investment;
