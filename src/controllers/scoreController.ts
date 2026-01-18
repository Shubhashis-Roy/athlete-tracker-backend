import { Request, Response } from "express";
import Score from "../models/score.model";

export const addScore = async (req: Request, res: Response) => {
  const score = new Score(req.body);
  await score.save();
  res.json(score);
};

export const getScoresByAthlete = async (req: Request, res: Response) => {
  const scores = await Score.find({
    athleteId: req.params.id,
  }).populate("testId");

  res.json(scores);
};
