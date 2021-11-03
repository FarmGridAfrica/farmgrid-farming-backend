import Admin from "../server/models/adminModel.js";
import { BAD_REQUEST } from "../server/types/statusCode.js";
import { getUserFromToken } from "../utils/jsonWebToken.js";

export const isAdmin = async (req, res, next) => {
  const user = getUserFromToken(req);
  const admin = await Admin.findOne({ email: user.email });
  if (admin) {
    next();
  } else {
    return res.status(BAD_REQUEST).json({ message: "Not admin" });
  }
};
