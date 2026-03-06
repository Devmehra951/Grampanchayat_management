import { Complaint } from "../models/Complaint.js";
import { Roles } from "../utils/constants.js";

export const createComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.create({
      ...req.body,
      citizen: req.user.id
    });
    return res.status(201).json(complaint);
  } catch (error) {
    return next(error);
  }
};

export const listComplaints = async (req, res, next) => {
  try {
    const query = req.user.role === Roles.citizen ? { citizen: req.user.id } : {};
    const complaints = await Complaint.find(query).sort({ createdAt: -1 });
    return res.json(complaints);
  } catch (error) {
    return next(error);
  }
};

export const updateComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    return res.json(complaint);
  } catch (error) {
    return next(error);
  }
};
