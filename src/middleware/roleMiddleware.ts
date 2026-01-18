import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

export const requireCoach = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role.name !== "coach") {
    return res.status(403).json({ message: "Access denied. Coach only." });
  }
  next();
};
