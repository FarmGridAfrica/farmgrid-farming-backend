import { checkExist } from "../utils/checkExist.js";
import User from "../server/models/UserModel.js";
import { BAD_REQUEST, SERVER_ERROR } from "../server/types/statusCode.js";

export const userUniqueSchemaValueExist = async (req, res, next) => {
  try {
    const { walletAddress, facebookUsername, telegramUsername, email } =
      req.body;

    let emailExist = "";

    if (email) emailExist = await User.findOne({ email });
    const walletExist = await User.findOne({ walletAddress });
    const facebookExist = await User.findOne({ facebookUsername });
    const telegramExist = await User.findOne({ telegramUsername });

    if (walletExist) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Already have wallet address" });
    }

    if (emailExist) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Email have wallet address" });
    }

    if (facebookExist) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Facebook username exist" });
    }

    if (telegramExist) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Telegram username exist" });
    }

    next();
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
};
