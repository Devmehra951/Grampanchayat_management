import mongoose from "mongoose";

const clubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String },
    head: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

export const Club = mongoose.model("Club", clubSchema);
