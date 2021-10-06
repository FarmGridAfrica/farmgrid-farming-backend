import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  walletAddress: {
    type: String,
    unique: true,
    required: true,
  },
  telegramUsername: {
    type: String,
    unique: true,
    required: false,
  },
  facebookUsername: {
    type: String,
    unique: true,
  },
  twitterUsername: {
    type: String,
  },
  instagramUsername: {
    type: String,
  },
  referralWalletAddress: {
    type: String,
    required: false,
  },
  referralCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// VIRTUALS *//
UserSchema.virtual("referralLink").get(function () {
  return process.env.WEBSITE_URL`${this._id || ""}`;
});

const User = mongoose.model("User", UserSchema);
export default User;
