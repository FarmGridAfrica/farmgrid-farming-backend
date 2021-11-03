import Plan from "../models/PlanModel.js";
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

export async function createPlan(req, res, next) {
  try {
    const {
      planName,
      photo,
      description,
      products,
      returnOfInvestment,
      amount,
      startDate,
      endDate,
    } = req.body;

    if (
      !planName ||
      !description ||
      !photo ||
      !products ||
      !returnOfInvestment ||
      !amount ||
      !startDate ||
      !endDate
    ) {
      return res.status(BAD_REQUEST).json({
        message:
          "Please provide all field values( Plan name, description and photo)",
      });
    }

    const newPlan = await Plan.create({
      planName,
      photo,
      description,
      returnOfInvestment,
      products,
      amount,
      startDate,
      endDate,
    });

    return res.status(SUCCESS).json({
      message: "Plan created successfully",
      newPlan,
    });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
}

export async function updatePlan(req, res, next) {
  try {
    const { ...rest } = req.body;
    const { planId } = req.params;
    const response = await Plan.findByIdAndUpdate(planId, {
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

export async function getPlans(req, res, next) {
  try {
    const response = await Plan.find().populate("products.product");

    if (!response)
      return res.status(BAD_REQUEST).json({ message: ITEM_NOT_FOUND });

    return res
      .status(SUCCESS)
      .json({ message: FETCHED_SUCCESSFUL, plan: response });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
}

export async function getSinglePlan(req, res, next) {
  try {
    const { planId } = req.params;

    const response = await Plan.findById(planId).populate("products.product");

    if (!response)
      return res.status(BAD_REQUEST).json({ message: ITEM_NOT_FOUND });

    return res
      .status(SUCCESS)
      .json({ message: FETCHED_SUCCESSFUL, plan: response });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
}

export async function deleteSinglePlan(req, res, next) {
  try {
    const { planId } = req.params;
    const response = await Plan.findByIdAndDelete(planId);
    if (!response)
      return res.status(BAD_REQUEST).json({ message: ITEM_NOT_FOUND });

    return res.status(SUCCESS).json({ message: DELETED_SUCCESSFUL });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
}
