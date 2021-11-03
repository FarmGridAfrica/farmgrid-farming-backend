import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const getUserFromToken = async (req) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      throw Error("User Unauthorized");
    }
    const jwtPayload = jwt.verify(token, process.env.JWT_SECRET);
    const { user } = jwtPayload;
    return user;
  } catch (e) {
    throw Error(e);
  }
};
