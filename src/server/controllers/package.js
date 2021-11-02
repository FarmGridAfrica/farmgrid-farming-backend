import Package from "../models/PackageModel.js";
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

export async function createPackage(req, res, next) {
  try {
    const {
      packageName,
      photo,
      description,
      Products,
      returnOfInvestment,
      amount,
      startDate,
      endDate,
    } = req.body;

    if (
      !packageName ||
      !description ||
      !photo ||
      !Products ||
      !returnOfInvestment ||
      !amount ||
      !startDate ||
      !endDate
    ) {
      return res.status(BAD_REQUEST).json({
        message:
          "Please provide all field values( Package name, description and photo)",
      });
    }

    const newPackage = await Package.create({
      packageName,
      photo,
      description,
      Products,
      returnOfInvestment,
      amount,
      startDate,
      endDate,
    });

    return res.status(SUCCESS).json({
      message: "Package created successfully",
      newPackage,
    });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
}

export async function updatePackage(req, res, next) {
  try {
    const { ...rest } = req.body;
    const { packageId } = req.params;
    const response = await Product.findByIdAndUpdate(packageId, {
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

export async function getPackages(req, res, next) {
  try {
    const response = await Package.find();

    if (!response)
      return res.status(BAD_REQUEST).json({ message: ITEM_NOT_FOUND });

    return res
      .status(SUCCESS)
      .json({ message: FETCHED_SUCCESSFUL, package: response });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
}

export async function getSinglePackage(req, res, next) {
  try {
    const { packageId } = req.params;

    const response = await Package.findById(packageId);

    if (!response)
      return res.status(BAD_REQUEST).json({ message: ITEM_NOT_FOUND });

    return res
      .status(SUCCESS)
      .json({ message: FETCHED_SUCCESSFUL, package: response });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
}

export async function deleteSinglePackage(req, res, next) {
  try {
    const { packageId } = req.params;
    const response = await Package.findByIdAndDelete(packageId);
    if (!response)
      return res.status(BAD_REQUEST).json({ message: ITEM_NOT_FOUND });

    return res.status(SUCCESS).json({ message: DELETED_SUCCESSFUL });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
}
