import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

const manageAdmin = async () => {
  try {
    const rawUri = (process.env.MONGO_URI || "").trim().replace(/;$/, "");
    if (!rawUri) {
      console.error("❌ Error: MONGO_URI is missing in .env");
      process.exit(1);
    }

    await mongoose.connect(rawUri, { serverSelectionTimeoutMS: 10000 });
    console.log("Connected to MongoDB");

    // CLI args: node createAdmin.js [username] [password]
    const targetUsername = process.argv[2] || "admin";
    const targetPassword = process.argv[3] || "Admin@2026!";

    const hashedPassword = await bcrypt.hash(targetPassword, 10);

    const existing = await Admin.findOne({ username: targetUsername });

    if (existing) {
      existing.password = hashedPassword;
      await existing.save();
      console.log(`✅ Password successfully RESET for existing admin: "${targetUsername}"`);
    } else {
      await Admin.create({
        username: targetUsername,
        password: hashedPassword
      });
      console.log(`✅ New admin user CREATED: "${targetUsername}"`);
    }

    console.log(`🔑 Credentials configured:`);
    console.log(`   Username: ${targetUsername}`);
    console.log(`   Password: ${targetPassword}`);

    const allAdmins = await Admin.find({}, { username: 1, _id: 1 });
    console.log("\n📋 All registered admin accounts in DB:");
    allAdmins.forEach((a, i) => {
      console.log(`   ${i + 1}. ${a.username} (ID: ${a._id})`);
    });

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error managing admin account:", error);
    process.exit(1);
  }
};

manageAdmin();