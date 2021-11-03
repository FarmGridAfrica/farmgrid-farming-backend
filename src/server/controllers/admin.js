import { generateToken } from "../../utils/jsonWebToken.js";
import Admin from "../models/adminModel.js";

import {
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  SUCCESS,
} from "../types/statusCode.js";

export async function register(req, res, next) {
  try {
    const { email, password } = req.body;

    const admin = await Admin.create({
      email,
      password,
    });

    return res.status(SUCCESS).json({
      message: "Successfully registered",
      admin,
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

    const admin = await Admin.findOne({ email });

    if (admin) {
      const isPasswordValid = await admin.matchPassword(password);

      if (!isPasswordValid) {
        return res
          .status(BAD_REQUEST)
          .json({ message: "email or password invalid" });
      }

      const token = generateToken(admin);

      return res.status(SUCCESS).json({ token, admin });
    }

    return res
      .status(NOT_FOUND)
      .json({ message: "email of password invalid " });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
}
