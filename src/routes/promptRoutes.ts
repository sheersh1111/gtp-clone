import express from "express";
import {
  createPrompt,
  getPrompts,
} from "../controllers/promptController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", protect, createPrompt);
router.get("/:conversationId", protect, getPrompts);

export default router;
