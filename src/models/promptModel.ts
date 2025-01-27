import mongoose, { Schema, Document } from "mongoose";

export interface IPrompt extends Document {
  question: string;
  answer: string;
  conversationId: string;
}

const PromptSchema: Schema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
  },
  { timestamps: true }
);

export const Prompt = mongoose.model<IPrompt>("Prompt", PromptSchema);
