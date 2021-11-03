import express from "express";
const router = express.Router();

import {
  createInvestment,
  updateInvestment,
  deleteSingleInvestment,
  getInvestments,
  getSingleInvestment,
} from "../controllers/investment.js";

router.post("/create", createInvestment);
router.put("/:gridPackageId", updateInvestment);
router.get("/", getInvestments);
router.get("/:gridPackageId", getSingleInvestment);
router.delete("/:gridPackageId", deleteSingleInvestment);

export default router;
