import { getUserFromToken } from "../../utils/jsonWebToken.js";
import Investment from "../models/Investment.js";
import {
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  SUCCESS,
} from "../types/statusCode.js";
import {
  UPDATE_SUCCESS,
  ITEM_NOT_FOUND,
  FETCHED_SUCCESSFUL,
  DELETED_SUCCESSFUL,
} from "../types/statusMessge.js";

export async function createInvestment(req, res, next) {
  try {
    const { user, plan } = req.body;

    if (!user || !plan) {
      return res.status(BAD_REQUEST).json({
        message: "Please provide all field values( user and plan)",
      });
    }

    const investment = await Investment.create({
      user,
      plan,
    });

    return res.status(SUCCESS).json({
      message: "Investment created successfully",
      investment,
    });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
}

export async function updateInvestment(req, res, next) {
  try {
    const { ...rest } = req.body;
    const { investmentId } = req.params;
    const response = await Investment.findByIdAndUpdate(investmentId, {
      $set: {
        ...rest,
      },
    });

    if (!response)
      return res.status(BAD_REQUEST).json({ message: ITEM_NOT_FOUND });

    return res.status(SUCCESS).json({ message: UPDATE_SUCCESS });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
}

export async function getInvestments(req, res, next) {
  try {
    const response = await Investment.find()
      .populate("plan")
      .populate("user")
      .exec();

    if (!response)
      return res.status(BAD_REQUEST).json({ message: ITEM_NOT_FOUND });

    return res.status(SUCCESS).json({ message: FETCHED_SUCCESSFUL, response });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
}

export async function getUserInvestments(req, res, next) {
  try {
    const user = getUserFromToken(req);

    const response = await Investment.find({ user: user._id }).populate("plan");

    if (!response)
      return res.status(BAD_REQUEST).json({ message: ITEM_NOT_FOUND });

    return res.status(SUCCESS).json({ message: FETCHED_SUCCESSFUL, response });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
}

export async function getSingleInvestment(req, res, next) {
  try {
    const { investmentId } = req.params;

    const response = await Investment.findById(investmentId)
      .populate("plan")
      .populate("user")
      .exec();

    if (!response)
      return res.status(BAD_REQUEST).json({ message: ITEM_NOT_FOUND });

    return res.status(SUCCESS).json({ message: FETCHED_SUCCESSFUL, response });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
}

export async function deleteSingleInvestment(req, res, next) {
  try {
    const { investmentId } = req.params;
    const response = await Investment.findByIdAndDelete(investmentId);
    if (!response)
      return res.status(BAD_REQUEST).json({ message: ITEM_NOT_FOUND });

    return res.status(SUCCESS).json({ message: DELETED_SUCCESSFUL });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
}
