import express from "express";
const router = express.Router();

import {
  createPackage,
  updatePackage,
  deleteSinglePackage,
  getPackages,
  getSinglePackage,
} from "../controllers/package.js";

router.post("/create", createPackage);
router.put("/:packageId", updatePackage);
router.get("/", getPackages);
router.get("/:packageId", getSinglePackage);
router.delete("/:packageId", deleteSinglePackage);

export default router;
