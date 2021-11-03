import express from "express";
const router = express.Router();

import {
  createGridPackage,
  updateGridPackage,
  deleteSingleGridPackage,
  getGridPackages,
  getSingleGridPackage,
} from "../controllers/gridpackage.js";

router.post("/create", createGridPackage);
router.put("/:gridPackageId", updateGridPackage);
router.get("/", getGridPackages);
router.get("/:gridPackageId", getSingleGridPackage);
router.delete("/:gridPackageId", deleteSingleGridPackage);

export default router;
