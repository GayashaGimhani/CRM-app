import Lead from "../models/Lead.js";
import Note from "../models/Note.js";

//create lead
export const createLead = async (req, res) => {
  const lead = await Lead.create(req.body);
  res.json(lead);
};


// get all leads
export const getLeads = async (req, res) => {
  const { status, leadSource, assignedSalesperson, search } = req.query;

  let filter = {};

  
  if (status) {
    filter.status = status;
  }

  // FIX: flexible matching
  if (leadSource) {
    filter.leadSource = { $regex: leadSource, $options: "i" };
  }

  if (assignedSalesperson) {
    filter.assignedSalesperson = { $regex: assignedSalesperson, $options: "i" };
  }

  // search across multiple fields
  if (search) {
    filter.$or = [
      { leadName: { $regex: search, $options: "i" } },
      { companyName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } }
    ];
  }

  const leads = await Lead.find(filter).sort({ createdAt: -1 });
  res.json(leads);
};

//get single lead
export const getLead = async (req, res) => {
  const lead = await Lead.findById(req.params.id).lean();

  res.json({
    ...lead,
    phoneNumber: lead.phoneNumber || ""
  });
};

//update lead
export const updateLead = async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(lead);
};

//updatdeletee lead
export const deleteLead = async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ message: "Lead deleted" });
};

// dashboard
export const dashboard = async (req, res) => {
  const leads = await Lead.find();

  const total = leads.length;
  const newLeads = leads.filter(l => l.status === "New").length;
  const qualified = leads.filter(l => l.status === "Qualified").length;
  const won = leads.filter(l => l.status === "Won").length;
  const lost = leads.filter(l => l.status === "Lost").length;

  const totalDealValue = leads.reduce((sum, l) => sum + (l.dealValue || 0), 0);

  const wonDealValue = leads
    .filter(l => l.status === "Won")
    .reduce((sum, l) => sum + (l.dealValue || 0), 0);

  res.json({
    total,
    newLeads,
    qualified,
    won,
    lost,
    totalDealValue,
    wonDealValue
  });
};

//update status 
export const updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updatedLead);
  } catch (err) {
    res.status(500).json({ message: "Failed to update status" });
  }
};