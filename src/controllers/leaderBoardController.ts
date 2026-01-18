import { Request, Response } from "express";
import Score from "../models/score.model";
import Test from "../models/test.model";
import Athlete from "../models/athlete.model";
import { normalizeScore } from "../utils/scoreNormalizer";

export const getLeaderboard = async (req: Request, res: Response) => {
  const scores = await Score.find().populate("testId").populate("athleteId");

  const result: any = {};

  scores.forEach((s: any) => {
    const athleteId = s.athleteId._id.toString();

    if (!result[athleteId]) {
      result[athleteId] = {
        athlete: s.athleteId.name,
        total: 0,
      };
    }

    result[athleteId].total += normalizeScore(s.value, s.testId.betterIs);
  });

  const leaderboard = Object.values(result).sort(
    (a: any, b: any) => b.total - a.total
  );

  res.json(leaderboard);
};
