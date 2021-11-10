import Farm from "../models/FarmModel.js";
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

export async function createFarm(req, res, next) {
  try {
    const {
      farmName,
      photo,
      description,
      returnOfInvestment,
      country,
      amount,
      startDate,
      endDate,
    } = req.body;

    console.log({
      farmName,
      photo,
      description,
      returnOfInvestment,
      country,
      amount,
      startDate,
      endDate,
    });

    if (
      !farmName ||
      !description ||
      !photo ||
      !country ||
      !returnOfInvestment ||
      !amount ||
      !startDate ||
      !endDate
    ) {
      return res.status(BAD_REQUEST).json({
        message:
          "Please provide all field values( Farm name, description and photo)",
      });
    }

    const farm = await Farm.create({
      farmName,
      photo,
      description,
      country,
      returnOfInvestment,
      amount,
      startDate,
      endDate,
    });

    return res.status(SUCCESS).json({
      message: "Farm created successfully",
      farm,
    });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
}

export async function updateFarm(req, res, next) {
  try {
    const { ...rest } = req.body;
    const { farmId } = req.params;
    const response = await Farm.findByIdAndUpdate(farmId, {
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

export async function getFarms(req, res, next) {
  try {
    const response = await Farm.find();

    if (!response)
      return res.status(BAD_REQUEST).json({ message: ITEM_NOT_FOUND });

    return res
      .status(SUCCESS)
      .json({ message: FETCHED_SUCCESSFUL, farms: response });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
}

export async function getSingleFarm(req, res, next) {
  try {
    const { farmId } = req.params;

    const response = await Farm.findById(farmId);

    if (!response)
      return res.status(BAD_REQUEST).json({ message: ITEM_NOT_FOUND });

    return res
      .status(SUCCESS)
      .json({ message: FETCHED_SUCCESSFUL, farm: response });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
}

export async function deleteSingleFarm(req, res, next) {
  try {
    const { farmId } = req.params;
    const response = await Farm.findByIdAndDelete(farmId);
    if (!response)
      return res.status(BAD_REQUEST).json({ message: ITEM_NOT_FOUND });

    return res.status(SUCCESS).json({ message: DELETED_SUCCESSFUL });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
}
export async function deleteFarms(req, res, next) {
  try {
    const response = await Farm.deleteMany();

    if (!response)
      return res.status(BAD_REQUEST).json({ message: ITEM_NOT_FOUND });

    return res.status(SUCCESS).json({ message: DELETED_SUCCESSFUL });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
}
