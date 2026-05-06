import express from "express";
import auth from "../middleware/auth.js";
import { addNote, getNotes } from "../controllers/noteController.js";

const router = express.Router();

router.use(auth);

router.post("/", addNote);
router.get("/:leadId", getNotes);

export default router;