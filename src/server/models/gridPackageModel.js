import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const GridPackageSchema = mongoose.Schema({
  gridpackageName: {
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  // duration: {

  // },
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

GridPackageSchema.pre(/^(save)/, function () {
  let self = this;
  //function to calculate duration from startDate and endDate
});

const GridPackage = mongoose.model("GridPackage", GridPackageSchema);
export default GridPackage;
