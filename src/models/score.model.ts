import mongoose, { Schema, Document } from "mongoose";

export interface IScore extends Document {
  athleteId: mongoose.Types.ObjectId;
  testId: mongoose.Types.ObjectId;
  value: number;
  date: Date;
}

const ScoreSchema: Schema = new Schema(
  {
    athleteId: {
      type: Schema.Types.ObjectId,
      ref: "Athlete",
      required: true,
    },
    testId: {
      type: Schema.Types.ObjectId,
      ref: "Test",
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IScore>("Score", ScoreSchema);
