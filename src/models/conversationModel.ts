import mongoose, { Schema, Document } from "mongoose";

export interface IConversation extends Document {
  userId: string;
  title: string;
  prompts: string[]; // Array of prompt IDs
}

const ConversationSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
  },
  { timestamps: true }
);

export const Conversation = mongoose.model<IConversation>(
  "Conversation",
  ConversationSchema
);
