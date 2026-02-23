import mongoose from "mongoose";
import { ComplaintStatus } from "../utils/constants.js";

const complaintSchema = new mongoose.Schema(
  {
    citizen: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ url: String, uploadedAt: Date }],
    status: {
      type: String,
      enum: Object.values(ComplaintStatus),
      default: ComplaintStatus.pending
    },
    assignedOfficer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    resolutionNotes: { type: String },
    internalNotes: [{ note: String, createdAt: Date, author: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }]
  },
  { timestamps: true }
);

export const Complaint = mongoose.model("Complaint", complaintSchema);
