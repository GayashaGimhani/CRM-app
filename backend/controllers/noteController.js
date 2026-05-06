import mongoose from "mongoose"; 
import Note from "../models/Note.js";

//add note to lead
export const addNote = async (req, res) => {
  const { leadId, noteContent, createdBy } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(leadId)) {
    return res.status(400).json({ message: "Invalid leadId" });
  }

  const note = await Note.create({
    leadId,
    noteContent,
    createdBy
  });

  res.json(note);
};

//get all note for lead
export const getNotes = async (req, res) => {
  const notes = await Note.find({ leadId: req.params.leadId })
    .sort({ createdAt: -1 });

  res.json(notes);
};