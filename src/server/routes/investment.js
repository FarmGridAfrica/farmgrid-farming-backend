import express from "express";
import { isAdmin } from "../../middleware/admin.js";
const router = express.Router();

import {
  createInvestment,
  updateInvestment,
  deleteSingleInvestment,
  getInvestments,
  getSingleInvestment,
  getUserInvestments,
} from "../controllers/investment.js";

router.post("/create", createInvestment);
//middleware to allow only admin update investemt
// router.put("/:investmentId", [isAdmin], updateInvestment);
router.put("/:investmentId", updateInvestment);
router.get("/", getInvestments);
router.get("/user", getUserInvestments);
router.get("/:investmentId", getSingleInvestment);
router.delete("/:investmentId", deleteSingleInvestment);

export default router;
