import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    leadName: { type: String, required: true },
    companyName: String,
    email: String,
    phoneNumber: String,
    leadSource: String,
    assignedSalesperson: String,
    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Proposal Sent", "Won", "Lost"],
      default: "New"
    },
    dealValue: Number
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);