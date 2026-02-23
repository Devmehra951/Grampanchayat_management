import mongoose from "mongoose";

const festivalEventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    festivalType: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    budgetAllocated: { type: Number, default: 0 },
    expenses: [{ label: String, amount: Number, createdAt: Date }],
    volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    announcements: [{ message: String, createdAt: Date }]
  },
  { timestamps: true }
);

export const FestivalEvent = mongoose.model("FestivalEvent", festivalEventSchema);
