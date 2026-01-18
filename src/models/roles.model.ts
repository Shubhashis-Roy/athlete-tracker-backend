import mongoose, { Schema, Document } from "mongoose";

export interface IRole extends Document {
  name: string;
}

const RoleSchema: Schema = new Schema(
  {
    name: {
      type: String,
      enum: ["coach", "viewer"],
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IRole>("Role", RoleSchema);
