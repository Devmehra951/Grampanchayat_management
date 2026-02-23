import { User } from "../models/User.js";
import { Donation } from "../models/Donation.js";
import { DevelopmentProject } from "../models/DevelopmentProject.js";
import { Complaint } from "../models/Complaint.js";
import { FestivalEvent } from "../models/FestivalEvent.js";

export const getDashboardSummary = async (req, res, next) => {
  try {
    const [userCount, totalDonation, activeProjects, openComplaints, upcomingFestivals] =
      await Promise.all([
        User.countDocuments({ isActive: true }),
        Donation.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]),
        DevelopmentProject.countDocuments({ status: { $in: ["PENDING", "ACTIVE"] } }),
        Complaint.countDocuments({ status: { $in: ["PENDING", "ASSIGNED", "IN_PROGRESS"] } }),
        FestivalEvent.find({ endDate: { $gte: new Date() } })
          .sort({ startDate: 1 })
          .limit(5)
          .select("name startDate endDate")
      ]);

    return res.json({
      users: userCount,
      donationTotal: totalDonation?.[0]?.total || 0,
      activeProjects,
      openComplaints,
      upcomingFestivals
    });
  } catch (error) {
    return next(error);
  }
};
