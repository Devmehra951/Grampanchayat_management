import { connectDatabase } from "../config/db.js";
import { DevelopmentProject } from "../models/DevelopmentProject.js";
import { FestivalEvent } from "../models/FestivalEvent.js";
import { Donation } from "../models/Donation.js";
import { Complaint } from "../models/Complaint.js";
import { User } from "../models/User.js";
import { Roles } from "../utils/constants.js";

const ensureOfficer = async () => {
  const email = "officer@panchayat.local";
  let officer = await User.findOne({ email });
  if (!officer) {
    officer = await User.create({
      fullName: "Demo Officer",
      email,
      phone: "9000000001",
      password: "Officer@123",
      role: Roles.officer
    });
  }
  return officer;
};

const seedDemoData = async () => {
  await connectDatabase();
  const officer = await ensureOfficer();

  if ((await DevelopmentProject.countDocuments()) === 0) {
    await DevelopmentProject.insertMany([
      {
        name: "Ward 2 Road Repair",
        category: "Roads",
        description: "Road resurfacing for ward 2",
        budget: 800000,
        spent: 150000,
        startDate: new Date(),
        status: "ACTIVE",
        officers: [officer._id]
      },
      {
        name: "Village Water Plant",
        category: "Water supply",
        description: "New filtration plant",
        budget: 1250000,
        spent: 0,
        startDate: new Date(),
        status: "PENDING",
        officers: [officer._id]
      }
    ]);
  }

  if ((await FestivalEvent.countDocuments()) === 0) {
    await FestivalEvent.insertMany([
      {
        name: "Durga Puja",
        festivalType: "Durga Puja",
        startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        budgetAllocated: 350000,
        volunteers: [officer._id]
      }
    ]);
  }

  if ((await Donation.countDocuments()) === 0) {
    await Donation.insertMany([
      {
        donorName: "Ravi Sharma",
        donorPhone: "9999999999",
        amount: 5000,
        method: "ONLINE",
        templeName: "Shiv Mandir",
        receiptNumber: `DON-DEMO-${Date.now()}`,
        receivedBy: officer._id
      }
    ]);
  }

  if ((await Complaint.countDocuments()) === 0) {
    const citizen = await User.findOne({ role: Roles.citizen });
    if (citizen) {
      await Complaint.create({
        citizen: citizen._id,
        category: "Roads / Drainage",
        description: "Drainage blockage near ward 2",
        status: "ASSIGNED",
        assignedOfficer: officer._id
      });
    }
  }

  console.log("Demo data seeded. Officer login: officer@panchayat.local / Officer@123");
  process.exit(0);
};

seedDemoData();
