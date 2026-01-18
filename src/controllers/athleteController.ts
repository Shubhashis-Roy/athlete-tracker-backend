import { Response } from "express";
import Athlete from "../models/athlete.model";
import { AuthRequest } from "../middleware/authMiddleware";

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
