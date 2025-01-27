import express from "express";
import {
  createConversation,
  getConversations,
} from "../controllers/conversationController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", protect, createConversation);
router.get("/", protect, getConversations);

export default router;
