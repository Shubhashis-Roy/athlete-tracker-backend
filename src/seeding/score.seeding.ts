import mongoose from "mongoose";
import connectDB from "../config/db";
import Score from "../models/score.model";
import dotenv from "dotenv";

dotenv.config();

const seedScores = async () => {
  await connectDB();

  const dummyScores = [
    {
      _id: new mongoose.Types.ObjectId("696e8bff5a9539dcdb88898e"),
      athleteId: new mongoose.Types.ObjectId("696d27269d99928ffdd599ff"),
      testId: new mongoose.Types.ObjectId("64fa112233445566778899aa"),
      value: 85,
      date: new Date("2024-03-10"),
    },
    {
      athleteId: new mongoose.Types.ObjectId("696d27269d99928ffdd599ff"),
      testId: new mongoose.Types.ObjectId("64fa112233445566778899ab"),
      value: 90,
      date: new Date("2024-03-11"),
    },
    {
      athleteId: new mongoose.Types.ObjectId("696d27269d99928ffdd599ff"),
      testId: new mongoose.Types.ObjectId("64fa112233445566778899ac"),
      value: 76,
      date: new Date("2024-03-12"),
    },
    {
      athleteId: new mongoose.Types.ObjectId("64fa99887766554433221100"),
      testId: new mongoose.Types.ObjectId("64fa112233445566778899ac"),
      value: 88,
      date: new Date("2024-03-13"),
    },
  ];

  await Score.insertMany(dummyScores);

  console.log("Dummy Scores Seeded!");
  process.exit();
};

seedScores();
