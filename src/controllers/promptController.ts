import { Request, Response } from "express";
import { Prompt } from "../models/promptModel";
import { createConversation } from "../repository/conversationRepo";
import { promptQuestion } from "../service";

export const createPrompt = async (req: any, res: Response) => {
  let { question, conversationId } = req.body;
  const promptAnswer = await promptQuestion(question);
  const answer=promptAnswer.choices?.[0]?.message?.content;
  
  try {
    if(!conversationId){
        const title = question.slice(0,10);
        const conversation:any= await createConversation(req.user,title);
        console.log(conversation);
        
        conversationId = conversation._id;
    }
    const prompt = await Prompt.create({ question, answer, conversationId });
    res.status(201).json(prompt);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getPrompts = async (req: Request, res: Response) => {
  const { conversationId } = req.params;
  try {
    const prompts = await Prompt.find({ conversationId }).sort({createdAt:1});
    res.status(200).json(prompts);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
