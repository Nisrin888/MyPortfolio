import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "..", ".env") });

// Dynamic imports after dotenv is loaded
const { default: mongoose } = await import("mongoose");
const { default: User } = await import("./models/user.model.js");
const { default: config } = await import("../config/config.js");

const seedAdmin = async () => {
  try {
    console.log("Connecting to:", config.mongoUri);
    await mongoose.connect(config.mongoUri);
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@portfolio.com" });

    if (existingAdmin) {
      console.log("Admin user already exists!");
      console.log("Email: admin@portfolio.com");
    } else {
      // Create admin user
      const adminUser = new User({
        name: "Admin",
        email: "admin@portfolio.com",
        password: "admin123",
        role: "admin",
      });

      await adminUser.save();
      console.log("Admin user created successfully!");
      console.log("Email: admin@portfolio.com");
      console.log("Password: admin123");
    }

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding admin:", err);
    process.exit(1);
  }
};

seedAdmin();
