import User from "../models/User.js";

export async function register(req, res, next) {
  try {
    const query = req.query;

    const { refId } = query;

    const {
      walletAddress,
      telegramUsername,
      facebookUsername,
      twitterUsername,
      instagramUsername,
    } = req.body;

    const walletExist = await User.findOne({ walletAddress });
    const facebookExist = await User.findOne({ facebookUsername });
    const telegramExist = await User.findOne({ telegramUsername });

    if (walletExist) {
      res.status(400);
      throw new Error("Already have wallet address");
    }

    if (facebookExist) {
      res.status(400);
      throw new Error("Facebook username exist");
    }

    if (telegramExist) {
      res.status(400);
      throw new Error("Telegram username exist");
    }

    const referralUser = await User.findOne({ _id: refId });

    //Create user
    const newuser = await User.create({
      walletAddress,
      telegramUsername,
      facebookUsername,
      twitterUsername,
      instagramUsername,
      referralWalletAddress: referralUser ? referralUser.walletAddress : "",
    });

    if (referralUser) {
      referralUser.referralCount += 1;
      await referralUser.save();
    }

    const user = await newuser.save();

    const referralLink = process.env.WEBSITE_URL + `?refId=${user._id}`;

    return res.status(200).json({
      message: "Successfully registered",
      referralLink,
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getAllUsers(req, res, next) {
  try {
    const users = await User.find();

    return res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getReferralLink(req, res, next) {
  try {
    const { walletAddress } = req.body;

    const user = await User.findOne({ walletAddress });

    const referralLink = process.env.WEBSITE_URL + `?refId=${user._id}`;

    return res.status(200).json({
      message: "Referral Link",
      referralLink,
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
