import { User } from "../models/User.js";
import { Donation } from "../models/Donation.js";
import { DevelopmentProject } from "../models/DevelopmentProject.js";
import { Complaint } from "../models/Complaint.js";
import { FestivalEvent } from "../models/FestivalEvent.js";
import { Club } from "../models/Club.js";
import { Roles } from "../utils/constants.js";

export const getDashboardSummary = async (req, res, next) => {
  try {
    const [
      userCount,
      totalDonation,
      activeProjects,
      openComplaints,
      upcomingFestivals,
      citizenCount,
      complaintCitizens,
      donorCitizens,
      clubParticipation,
      festivalParticipation
    ] = await Promise.all([
      User.countDocuments({ isActive: true }),
      Donation.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]),
      DevelopmentProject.countDocuments({ status: { $in: ["PENDING", "ACTIVE"] } }),
      Complaint.countDocuments({ status: { $in: ["PENDING", "ASSIGNED", "IN_PROGRESS"] } }),
      FestivalEvent.find({ endDate: { $gte: new Date() } })
        .sort({ startDate: 1 })
        .limit(5)
        .select("name startDate endDate volunteers"),
      User.countDocuments({ role: Roles.citizen, isActive: true }),
      Complaint.distinct("citizen"),
      Donation.distinct("citizen", { citizen: { $ne: null } }),
      Club.aggregate([{ $project: { membersCount: { $size: "$members" } } }, { $group: { _id: null, total: { $sum: "$membersCount" } } }]),
      FestivalEvent.aggregate([{ $project: { volunteersCount: { $size: "$volunteers" } } }, { $group: { _id: null, total: { $sum: "$volunteersCount" } } }])
    ]);

    return res.json({
      users: userCount,
      donationTotal: totalDonation?.[0]?.total || 0,
      activeProjects,
      openComplaints,
      upcomingFestivals,
      participation: {
        citizens: citizenCount,
        complaintParticipants: complaintCitizens.length,
        donorParticipants: donorCitizens.filter(Boolean).length,
        clubParticipants: clubParticipation?.[0]?.total || 0,
        festivalVolunteers: festivalParticipation?.[0]?.total || 0
      }
    });
  } catch (error) {
    return next(error);
  }
};
