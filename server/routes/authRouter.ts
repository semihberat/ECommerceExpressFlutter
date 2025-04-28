import express from "express";
import { register, login, verifyEmail } from "../controllers/authController";
const router = express.Router();

router.post("/register", register);
router.get("/verify-email", verifyEmail);
router.post("/login", login);

export default router;
