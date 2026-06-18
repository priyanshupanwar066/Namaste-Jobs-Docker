import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import jobRoutes from "./routes/JobRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { connect } from "./config/db.js";

dotenv.config();

// ✅ Connect to MongoDB
connect();

const app = express();

// ✅ Middleware
app.use(cors({
  origin: [
    "http://34.230.134.233",
    "http://34.230.134.233:3000",
    "http://localhost:3000",
    "https://namaste-jobs-frontend.vercel.app"
  ],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.get("/", (req, res) => {
    res.status(200).json({ message: "🚀 Server is Running!" });
});
app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/jobs", jobRoutes);
app.use("/jobs", jobRoutes);

app.use("/api/auth", authRoutes);
app.use("/auth", authRoutes);

// ✅ Global Error Handler
app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server Running On Port ${PORT}`));
