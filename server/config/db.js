import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const rawUri = (process.env.MONGO_URI || "").trim().replace(/;$/, "");
    await mongoose.connect(rawUri, {
      serverSelectionTimeoutMS: 10000
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ DB Error:", error.message);
  }
};

export default connectDB;