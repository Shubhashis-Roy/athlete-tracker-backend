import mongoose, { Schema, Document } from "mongoose";

export interface ITest extends Document {
  athleteId: mongoose.Types.ObjectId;
  sprintTime: number;
  verticalJump: number;
  agilityTest: number;
  enduranceTest: number;
  date: Date;
}

const TestSchema: Schema = new Schema(
  {
    athleteId: {
      type: Schema.Types.ObjectId,
      ref: "Athlete",
      required: true,
      unique: true, // 👈 important fix
      index: true,
    },

    sprintTime: {
      type: Number,
    },

    verticalJump: {
      type: Number,
    },

    agilityTest: {
      type: Number,
    },

    enduranceTest: {
      type: Number,
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITest>("Test", TestSchema);
