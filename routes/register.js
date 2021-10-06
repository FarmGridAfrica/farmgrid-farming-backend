import express from "express";
const router = express.Router();

import {
  register,
  getAllUsers,
  getReferralLink,
} from "../controllers/register.js";

router.post("/register", register);
router.get("", getAllUsers);
router.post("/referral", getReferralLink);

export default router;
