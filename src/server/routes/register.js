import express from "express";
import { userUniqueSchemaValueExist } from "../../middleware/user.js";
const router = express.Router();

import {
  register,
  getAllReferrals,
  getReferralLink,
  login,
} from "../controllers/auth.js";

router.post("/register", [userUniqueSchemaValueExist], register);
router.post("/login", login);
router.get("/users", getAllReferrals);
router.post("/referral", getReferralLink);

export default router;
