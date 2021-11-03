import GridPackage from "../models/GridPackageModel.js";
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

export async function createGridPackage(req, res, next) {
  try {
    const {
      gridpackageName,
      photo,
      description,
      Products,
      returnOfInvestment,
      amount,
      startDate,
      endDate,
    } = req.body;

    if (
      !gridpackageName ||
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
          "Please provide all field values( GridPackage name, description and photo)",
      });
    }

    const newGridPackage = await GridPackage.create({
      gridpackageName,
      photo,
      description,
      Products,
      returnOfInvestment,
      amount,
      startDate,
      endDate,
    });

    return res.status(SUCCESS).json({
      message: "GridPackage created successfully",
      newGridPackage,
    });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
}

export async function updateGridPackage(req, res, next) {
  try {
    const { ...rest } = req.body;
    const { gridPackageId } = req.params;
    const response = await Product.findByIdAndUpdate(gridPackageId, {
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

export async function getGridPackages(req, res, next) {
  try {
    const response = await GridPackage.find();

    if (!response)
      return res.status(BAD_REQUEST).json({ message: ITEM_NOT_FOUND });

    return res
      .status(SUCCESS)
      .json({ message: FETCHED_SUCCESSFUL, gridpackage: response });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
}

export async function getSingleGridPackage(req, res, next) {
  try {
    const { gridPackageId } = req.params;

    const response = await GridPackage.findById(gridPackageId);

    if (!response)
      return res.status(BAD_REQUEST).json({ message: ITEM_NOT_FOUND });

    return res
      .status(SUCCESS)
      .json({ message: FETCHED_SUCCESSFUL, gridpackage: response });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
}

export async function deleteSingleGridPackage(req, res, next) {
  try {
    const { gridPackageId } = req.params;
    const response = await GridPackage.findByIdAndDelete(gridPackageId);
    if (!response)
      return res.status(BAD_REQUEST).json({ message: ITEM_NOT_FOUND });

    return res.status(SUCCESS).json({ message: DELETED_SUCCESSFUL });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
}
