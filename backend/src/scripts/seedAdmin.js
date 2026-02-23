import { connectDatabase } from "../config/db.js";
import { User } from "../models/User.js";
import { Roles } from "../utils/constants.js";

const seedAdmin = async () => {
  await connectDatabase();

  const email = process.env.SEED_ADMIN_EMAIL || "admin@panchayat.local";
  const existing = await User.findOne({ email });
  if (existing) {
    console.log("Admin already exists:", email);
    process.exit(0);
  }

  await User.create({
    fullName: process.env.SEED_ADMIN_NAME || "System Admin",
    email,
    phone: process.env.SEED_ADMIN_PHONE || "9999999999",
    password: process.env.SEED_ADMIN_PASSWORD || "Admin@12345",
    role: Roles.admin
  });

  console.log("Admin seeded successfully:", email);
  process.exit(0);
};

seedAdmin();
