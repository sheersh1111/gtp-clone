import { Request, Response } from "express";
import { Conversation } from "../models/conversationModel";

export const createConversation = async (req: any, res: Response) => {
  const { title } = req.body;
  try {
    const conversation = await createConversation(req.user,title);
    res.status(201).json(conversation);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getConversations = async (req: any, res: Response) => {
  try {
    const conversations = await Conversation.find({ userId: req.user._id });
    res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
