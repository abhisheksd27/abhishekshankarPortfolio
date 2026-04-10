import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Models
import Admin from "./models/Admin.js";
import Portfolio from "./models/Portfolio.js";

// Routes
import authRoutes from "./routes/authRoutes.js";

// Middleware
import authMiddleware from "./middleware/authMiddleware.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";

import uploadRoute from "./routes/uploadRoute.js";
import path from "path";


dotenv.config();

const app = express();

// ================= MIDDLEWARE =================
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://abhishekshankar.in",
    "https://www.abhishekshankar.in"
  ],
  credentials: true
}));
app.use(express.json());

// Portfolio routes
app.use("/api/portfolio", portfolioRoutes);

// ================= ROUTES =================

// Auth Routes
app.use("/api/auth", authRoutes);

// serve images
app.use("/uploads", express.static("uploads"));

// route
app.use("/api/upload", uploadRoute);



// Test Route
app.get("/", (req, res) => {
  console.log("✅ Root route hit");
  res.send("🚀 Backend Running");
});

// Debug Admin Check
app.get("/check-admin", async (req, res) => {
  const admins = await Admin.find();
  res.json(admins);
});

// Optional Test Route
app.get("/test", (req, res) => {
  res.send("TEST WORKING");
});

// ================= PORTFOLIO ROUTES =================

// 🔓 Public: Get Portfolio
app.get("/api/portfolio", async (req, res) => {
  try {
    const data = await Portfolio.findOne();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔐 Protected: Create / Update Portfolio
app.post("/api/portfolio", authMiddleware, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();

    if (portfolio) {
      portfolio = await Portfolio.findOneAndUpdate({}, req.body, {
        new: true
      });
    } else {
      portfolio = new Portfolio(req.body);
      await portfolio.save();
    }

    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// ================= DATABASE =================
connectDB();

// ================= SERVER =================
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});