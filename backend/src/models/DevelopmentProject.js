import mongoose from "mongoose";
import { ProjectStatus } from "../utils/constants.js";

const developmentProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    budget: { type: Number, required: true },
    spent: { type: Number, default: 0 },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    status: { type: String, enum: Object.values(ProjectStatus), default: ProjectStatus.pending },
    officers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    progressImages: [{ url: String, uploadedAt: Date }],
    contractor: {
      name: String,
      phone: String,
      firm: String
    },
    materials: [{ name: String, quantity: Number, unitCost: Number }],
    laborRecords: [{ name: String, role: String, wage: Number, days: Number }]
  },
  { timestamps: true }
);

export const DevelopmentProject = mongoose.model("DevelopmentProject", developmentProjectSchema);
