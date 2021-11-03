import express from "express";
const router = express.Router();

import {
  createPlan,
  updatePlan,
  deleteSinglePlan,
  getPlans,
  getSinglePlan,
} from "../controllers/plan.js";

router.post("/create", createPlan);
router.put("/:planId", updatePlan);
router.get("/", getPlans);
router.get("/:planId", getSinglePlan);
router.delete("/:planId", deleteSinglePlan);

export default router;
