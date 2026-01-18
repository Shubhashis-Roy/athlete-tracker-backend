import express from "express";
import { addScore, getScoresByAthlete } from "../controllers/scoreController";
import { authMiddleware } from "../middleware/authMiddleware";
import { requireCoach } from "../middleware/roleMiddleware";

const router = express.Router();

router.post("/", authMiddleware, requireCoach, addScore);
router.get("/athlete/:id", authMiddleware, getScoresByAthlete);

export default router;
