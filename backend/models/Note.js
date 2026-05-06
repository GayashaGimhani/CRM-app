import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      required: true
    },
    noteContent: String,
    createdBy: String
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);