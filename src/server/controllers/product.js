import Product from "../models/ProductModel.js";
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

export async function createProduct(req, res, next) {
  try {
    const { productName, photo, description } = req.body;

    if (!productName || !description || !photo) {
      return res.status(BAD_REQUEST).json({
        message:
          "Please provide all field values( product name, description and photo)",
      });
    }

    const product = await Product.create({
      productName,
      photo,
      description,
    });

    return res.status(SUCCESS).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
}

export async function updateProduct(req, res, next) {
  try {
    const { ...rest } = req.body;
    const { productId } = req.params;
    const response = await Product.findByIdAndUpdate(productId, {
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

export async function getProducts(req, res, next) {
  try {
    const response = await Product.find();

    if (!response)
      return res.status(BAD_REQUEST).json({ message: ITEM_NOT_FOUND });

    return res
      .status(SUCCESS)
      .json({ message: FETCHED_SUCCESSFUL, products: response });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
}

export async function getSingleProduct(req, res, next) {
  try {
    const { productId } = req.params;

    const response = await Product.findById(productId);

    if (!response)
      return res.status(BAD_REQUEST).json({ message: ITEM_NOT_FOUND });

    return res
      .status(SUCCESS)
      .json({ message: FETCHED_SUCCESSFUL, products: response });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
}

export async function deleteSingleProduct(req, res, next) {
  try {
    const { productId } = req.params;
    const response = await Product.findByIdAndDelete(productId);
    if (!response)
      return res.status(BAD_REQUEST).json({ message: ITEM_NOT_FOUND });

    return res.status(SUCCESS).json({ message: DELETED_SUCCESSFUL });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
}
