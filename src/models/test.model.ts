import mongoose, { Schema, Document } from "mongoose";

export interface ITest extends Document {
  name: string;
  unit: string;
  betterIs: "higher" | "lower";
}

const TestSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    unit: {
      type: String,
      required: true,
    },
    betterIs: {
      type: String,
      enum: ["higher", "lower"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITest>("Test", TestSchema);
