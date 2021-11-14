import express from "express";
import { userUniqueSchemaValueExist } from "../../middleware/user.js";
const router = express.Router();

import {
  register,
  getAllReferrals,
  getReferralLink,
  login,
  signUp,
  googleAuth,
} from "../controllers/auth.js";

router.post("/register", [userUniqueSchemaValueExist], register);
router.post("/signup", signUp);
router.post("/login", login);
router.get("/users", getAllReferrals);
router.post("/referral", getReferralLink);
router.post("/google/:id", googleAuth);

export default router;
