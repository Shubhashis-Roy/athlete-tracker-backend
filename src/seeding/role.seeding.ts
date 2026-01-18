import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db";
import Role from "../models/roles.model";

dotenv.config();

const seedRoles = async () => {
  try {
    await connectDB();

    const roles = [{ name: "coach" }, { name: "viewer" }];

    console.log("Clearing existing roles...");
    await Role.deleteMany({});

    console.log("Seeding roles...");
    await Role.insertMany(roles);

    console.log("Roles seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);

    process.exit(1);
  }
};

seedRoles();
