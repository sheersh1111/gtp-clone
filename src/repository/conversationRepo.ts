import { Conversation } from "../models/conversationModel";

export async function createConversation(user: any, title: any) {
    const conversation = await Conversation.create({
        userId: user._id,
        title
    });
    return conversation
}
