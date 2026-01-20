import express from "express";
import {
  createAthlete,
  getAthletes,
  updateAthlete,
  deleteAthlete,
  getAthlete,
} from "../controllers/athleteController";

import { authMiddleware } from "../middleware/authMiddleware";
import { requireCoach } from "../middleware/roleMiddleware";

const router = express.Router();

router.post("/", authMiddleware, requireCoach, createAthlete);
router.get("/", authMiddleware, getAthletes);
router.get("/:id", authMiddleware, getAthlete);
router.put("/:id", authMiddleware, requireCoach, updateAthlete);
router.delete("/:id", authMiddleware, requireCoach, deleteAthlete);

export default router;
