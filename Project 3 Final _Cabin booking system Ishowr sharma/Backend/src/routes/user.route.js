import express from "express";
import { registerUser, loginUser, handleForgotPassword, handleVerifyOtp, handleResetPassword, getProfile } from "../controller/auth.controller.js";
import { protectedRoutes } from "../middleware/protectedRoutes.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", handleForgotPassword);
router.post("/verify-otp", handleVerifyOtp);
router.post("/reset-password", handleResetPassword);
router.get("/user/profile", protectedRoutes, getProfile);
export default router;

     