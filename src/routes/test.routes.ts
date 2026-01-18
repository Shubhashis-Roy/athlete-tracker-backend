import express from "express";
import { createTest, getTests } from "../controllers/testController";
import { authMiddleware } from "../middleware/authMiddleware";
import { requireCoach } from "../middleware/roleMiddleware";

const router = express.Router();

router.post("/", authMiddleware, requireCoach, createTest);
router.get("/", authMiddleware, getTests);

export default router;
