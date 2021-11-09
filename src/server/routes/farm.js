import express from "express";
const router = express.Router();

import {
  createFarm,
  updateFarm,
  deleteSingleFarm,
  getFarms,
  getSingleFarm,
  deleteFarms,
} from "../controllers/farm.js";

router.post("/create", createFarm);
router.put("/:farmId", updateFarm);
router.get("/", getFarms);
router.get("/:farmId", getSingleFarm);
router.delete("/:farmId", deleteSingleFarm);
router.delete("/", deleteFarms);

export default router;
