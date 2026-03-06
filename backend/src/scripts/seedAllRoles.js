import { connectDatabase } from "../config/db.js";
import { User } from "../models/User.js";
import { Roles } from "../utils/constants.js";

const defaults = [
  {
    fullName: "System Admin",
    email: "admin@panchayat.local",
    phone: "9770208318",
    password: "Admin@12345",
    role: Roles.admin
  },
  {
    fullName: "Officer One",
    email: "officer@panchayat.local",
    phone: "9000000002",
    password: "Officer@123",
    role: Roles.officer
  },
  {
    fullName: "Citizen One",
    email: "citizen@panchayat.local",
    phone: "9000000003",
    password: "Citizen@123",
    role: Roles.citizen
  }
];

const seedAllRoles = async () => {
  await connectDatabase();

  for (const payload of defaults) {
    const existing = await User.findOne({ email: payload.email });
    if (existing) {
      console.log(`User already exists: ${payload.email}`);
      continue;
    }

    await User.create(payload);
    console.log(`Created: ${payload.email} (${payload.role})`);
  }

  console.log("Role-wise seed completed.");
  process.exit(0);
};

seedAllRoles();
