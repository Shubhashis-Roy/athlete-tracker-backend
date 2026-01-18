import { Router } from "express";
import authRoutes from "./auth.routes";
import athleteRoutes from "./athlete.routes";
import leaderboardRoutes from "./leaderboard.routes";
import scoreRoutes from "./score.routes";
import testRoutes from "./test.routes";

const router = Router();

// All the routes
router.use("/auth", authRoutes);
router.use("/athletes", athleteRoutes);
router.use("/leaderboard", leaderboardRoutes);
router.use("/scores", scoreRoutes);
router.use("/tests", testRoutes);

export default router;
