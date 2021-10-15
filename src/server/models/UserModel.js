import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email",
    },
  },
  phone: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  walletAddress: {
    type: String,
    required: false,
  },
  telegramUsername: {
    type: String,
    required: false,
  },
  facebookUsername: {
    type: String,
    required: false,
  },
  twitterUsername: {
    type: String,
    required: false,
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
  referralLink: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre(/^(save)/, function () {
  let self = this;
  self.referralLink = process.env.WEBSITE_URL + `?refId=${self._id}`;
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", UserSchema);
export default User;
