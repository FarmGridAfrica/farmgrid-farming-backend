import { generateToken } from "../../utils/jsonWebToken.js";
import User from "../models/UserModel.js";
import {
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  SUCCESS,
} from "../types/statusCode.js";

export async function register(req, res, next) {
  try {
    const query = req.query;

    const { refId } = query;

    const {
      email,
      walletAddress,
      telegramUsername,
      facebookUsername,
      twitterUsername,
      instagramUsername,
      ...rest
    } = req.body;

    const referralUser = await User.findOne({ _id: refId });

    // Create user
    const user = await User.create({
      email,
      walletAddress,
      telegramUsername,
      facebookUsername,
      twitterUsername,
      instagramUsername,
      referralWalletAddress: referralUser ? referralUser.walletAddress : "",
      email: email ? email : "email@mail.com",
      ...rest,
    });

    if (referralUser) {
      referralUser.referralCount += 1;
      await referralUser.save();
    }

    const referralLink = `?refId=${user._id}`;

    return res.status(SUCCESS).json({
      message: "Successfully registered",
      referralLink,
      user,
    });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Please provide an email and password" });
    }

    const user = await User.findOne({ email });

    // if (user == undefined) {
    //   return res
    //     .status(BAD_REQUEST)
    //     .json({ message: "Username or password invalid" });
    // }

    if (user) {
      const isPasswordValid = await user.matchPassword(password);

      if (!isPasswordValid) {
        return res
          .status(BAD_REQUEST)
          .json({ message: "email or password invalid" });
      }

      const token = generateToken(user);

      return res.status(SUCCESS).json({ token, user });
    }

    return res
      .status(NOT_FOUND)
      .json({ message: "email of password invalid " });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
}

export async function getAllReferrals(req, res, next) {
  try {
    const users = await User.find();

    return res.status(SUCCESS).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
}

export async function getReferralLink(req, res, next) {
  try {
    const { walletAddress } = req.body;

    const user = await User.findOne({ walletAddress });

    if (!user) {
      return res.status(BAD_REQUEST).json({
        message: "User does not exist",
      });
    }

    const referralLink = process.env.WEBSITE_URL + `?refId=${user._id}`;

    return res.status(SUCCESS).json({
      message: "Referral Link",
      referralLink,
      user,
    });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
}
