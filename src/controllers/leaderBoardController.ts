import { Request, Response } from "express";
import Score from "../models/score.model";
import Test from "../models/test.model";
// import Athlete from "../models/athlete.model";
import { normalizeScore } from "../utils/scoreNormalizer";

// export const getLeaderboard = async (req: Request, res: Response) => {
//   const scores = await Score.find().populate("testId").populate("athleteId");

//   const result: any = {};

//   scores.forEach((s: any) => {
//     const athleteId = s.athleteId._id.toString();

//     if (!result[athleteId]) {
//       result[athleteId] = {
//         athlete: s.athleteId.name,
//         total: 0,
//       };
//     }

//     result[athleteId].total += normalizeScore(s.value, s.testId.betterIs);
//   });

//   const leaderboard = Object.values(result).sort(
//     (a: any, b: any) => b.total - a.total
//   );

//   res.json(leaderboard);
// };

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    // Get all tests with athlete populated
    const tests = await Test.find().populate("athleteId");

    const result: any = {};

    tests.forEach((test: any) => {
      const athleteId = test.athleteId._id.toString();

      if (!result[athleteId]) {
        result[athleteId] = {
          athlete: test.athleteId.name,
          totalScore: 0,
          testsCount: 0,
        };
      }

      // Example scoring logic:
      // Lower sprint time = better
      // Higher others = better

      const performanceScore =
        100 -
        test.sprintTime +
        test.verticalJump +
        (100 - test.agilityTest) +
        test.enduranceTest;

      result[athleteId].totalScore += performanceScore;
      result[athleteId].testsCount += 1;
    });

    // Convert to array and sort
    const leaderboard = Object.values(result)
      .map((item: any) => ({
        athlete: item.athlete,
        totalScore: item.totalScore,
        averageScore: item.totalScore / item.testsCount,
      }))
      .sort((a: any, b: any) => b.totalScore - a.totalScore);

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: "Error generating leaderboard", error });
  }
};
