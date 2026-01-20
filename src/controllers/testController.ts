import { Request, Response } from "express";
import Test from "../models/test.model";
import mongoose from "mongoose";

export const createOrUpdateTest = async (req: Request, res: Response) => {
  try {
    const { athleteId, sprintTime, verticalJump, agilityTest, enduranceTest } =
      req.body;

    if (!athleteId) {
      return res.status(400).json({
        message: "athleteId is required",
      });
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(athleteId)) {
      return res.status(400).json({
        message: "Invalid athleteId format",
      });
    }

    const updateData = {
      sprintTime,
      verticalJump,
      agilityTest,
      enduranceTest,
    };

    // Remove undefined fields (so they don’t overwrite existing values)
    Object.keys(updateData).forEach(
      (key) =>
        updateData[key as keyof typeof updateData] === undefined &&
        delete updateData[key as keyof typeof updateData]
    );

    // Try to find existing test
    let test = await Test.findOne({ athleteId });

    if (test) {
      // UPDATE EXISTING
      test = await Test.findOneAndUpdate({ athleteId }, updateData, {
        new: true,
        runValidators: true,
      });

      return res.status(200).json({
        message: "Test data updated successfully",
        data: test,
      });
    } else {
      // CREATE NEW
      const newTest = await Test.create({
        athleteId,
        ...updateData,
      });

      return res.status(201).json({
        message: "Test data created successfully",
        data: newTest,
      });
    }
  } catch (error) {
    console.error("Create/Update Test Error:", error);

    res.status(500).json({
      message: "Failed to save test data",
      error: (error as Error).message,
    });
  }
};

export const getTests = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "ID parameter is required",
      });
    }

    const tests = await Test.findOne({ athleteId: id });

    // If no test found, return default structure
    if (!tests) {
      return res.status(200).json({
        athleteId: id,
        sprintTime: 0,
        verticalJump: 0,
        agilityTest: 0,
        enduranceTest: 0,
      });
    }

    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch tests",
    });
  }
};
