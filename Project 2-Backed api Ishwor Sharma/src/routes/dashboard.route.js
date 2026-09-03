import express from "express";
import { getDashboardSummary } from "../controller/dashboard.controller.js";
import { accessTo, protectedRoutes } from "../middleware/protectedRoutes.js";

const router = express.Router();

router.get("/", protectedRoutes, accessTo("ADMIN"), getDashboardSummary);

export default router;
