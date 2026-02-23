import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    donorName: { type: String, required: true },
    donorPhone: { type: String, required: true },
    amount: { type: Number, required: true },
    method: { type: String, enum: ["ONLINE", "CASH"], default: "CASH" },
    festivalOrEvent: { type: String },
    templeName: { type: String, required: true },
    receivedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    citizen: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receiptNumber: { type: String, unique: true }
  },
  { timestamps: true }
);

export const Donation = mongoose.model("Donation", donationSchema);
