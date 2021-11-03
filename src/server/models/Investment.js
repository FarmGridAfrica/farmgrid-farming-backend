import mongoose from "mongoose";

const InvestmentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  gridpackage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GridPackage",
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Investment = mongoose.model("Investment", InvestmentSchema);
export default Investment;
