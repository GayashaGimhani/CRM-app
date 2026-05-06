import express from "express";
import auth from "../middleware/auth.js";

import {
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead,
  dashboard,
   updateLeadStatus
} from "../controllers/leadController.js";

const router = express.Router();

router.use(auth);

router.post("/", createLead);
router.get("/", getLeads);
router.get("/dashboard", dashboard);
router.get("/:id", getLead);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);
router.patch("/:id/status", updateLeadStatus);

export default router;