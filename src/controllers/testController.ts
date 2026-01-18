import { Request, Response } from "express";
import Test from "../models/test.model";

export const createTest = async (req: Request, res: Response) => {
  const test = new Test(req.body);
  await test.save();
  res.json(test);
};

export const getTests = async (req: Request, res: Response) => {
  const tests = await Test.find();
  res.json(tests);
};
