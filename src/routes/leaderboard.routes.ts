import express from "express";
import { getLeaderboard } from "../controllers/leaderBoardController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, getLeaderboard);

export default router;
