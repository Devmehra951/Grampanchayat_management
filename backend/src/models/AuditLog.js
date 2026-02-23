import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    action: { type: String, required: true, trim: true },
    actor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ipAddress: { type: String },
    userAgent: { type: String },
    metadata: { type: mongoose.Schema.Types.Mixed }
  },
  { timestamps: true }
);

export const AuditLog = mongoose.model("AuditLog", auditLogSchema);
