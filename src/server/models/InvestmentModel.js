import mongoose from "mongoose";

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
