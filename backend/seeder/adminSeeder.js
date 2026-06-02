import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../models/User.js";

dotenv.config();

const seedAdmins = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Delete existing admins first
    await User.deleteMany({ role: "admin" });
    console.log("🗑️ Deleted existing admin accounts");

    const admins = [
      {
        name: "Priyanshu",
        email: "priyanshugurjar066@gmail.com",
        password: await bcrypt.hash("7078041562", 10),
        role: "admin",
      },
      {
        name: "Priyu",
        email: "priyu@gmail.com",
        password: "7078041562",
        role: "admin",
      },
      {
        name: "Panwar",
        email: "panwar@gmail.com",
        password: "7078041562",
        role: "admin",
      },
      {
        name: "gurjar",
        email: "gurjar@gmail.com",
        password: "7078041562",
        role: "admin",
      },
      {
        name: "Priyanshu Panwar",
        email: "priyanshupanwar@gmail.com",
        password: "7078041562",
        role: "admin",
      },
    ];

    await User.insertMany(admins);
    console.log("✅ Admin accounts created successfully");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedAdmins();
