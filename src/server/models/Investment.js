import mongoose from "mongoose";

const InvestmentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
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

const Investment = mongoose.model("Investment", InvestmentSchema);
export default Investment;
