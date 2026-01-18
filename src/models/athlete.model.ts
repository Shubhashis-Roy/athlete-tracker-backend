import mongoose, { Schema, Document } from "mongoose";

export interface IAthlete extends Document {
  name: string;
  age: number;
  gender: string;
  sport: string;
  createdBy: mongoose.Types.ObjectId;
}

const AthleteSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    sport: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IAthlete>("Athlete", AthleteSchema);
