import { Response } from "express";
import Athlete from "../models/athlete.model";
import { AuthRequest } from "../middleware/authMiddleware";
import mongoose from "mongoose";

export const createAthlete = async (req: AuthRequest, res: Response) => {
  try {
    const athlete = new Athlete({
      ...req.body,
      createdBy: req.user._id,
    });

    await athlete.save();

    res.json(athlete);
  } catch (error) {
    res.status(500).json({ message: "Failed to create athlete" });
  }
};

export const getAthletes = async (req: AuthRequest, res: Response) => {
  const athletes = await Athlete.find();
  res.json(athletes);
};

export const getAthlete = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid athlete ID",
      });
    }

    const athlete = await Athlete.findById(id);

    if (!athlete) {
      return res.status(404).json({
        message: "Athlete not found",
      });
    }

    // Optional: ensure only creator can access (if required)
    if (
      req.user &&
      athlete.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Not authorized to view this athlete",
      });
    }

    res.status(200).json(athlete);
  } catch (error) {
    console.error("Error fetching athlete:", error);

    res.status(500).json({
      message: "Error retrieving athlete",
      error,
    });
  }
};

export const updateAthlete = async (req: AuthRequest, res: Response) => {
  const athlete = await Athlete.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(athlete);
};

export const deleteAthlete = async (req: AuthRequest, res: Response) => {
  await Athlete.findByIdAndDelete(req.params.id);
  res.json({ message: "Athlete deleted" });
};
