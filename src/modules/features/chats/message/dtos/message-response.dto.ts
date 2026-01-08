import { ChatSchema } from "../../chat/dtos/chat-response.dto";
import { MessageModel } from "../message.model";
import { z } from "zod";

export const MessageSchema = MessageModel.dbSchema;

export type MessageDto = z.infer<typeof MessageSchema>;

export const MessageChatSchema = MessageSchema.extend({
  chat: ChatSchema,
});

export type MessageChatDto = z.infer<typeof MessageChatSchema>;
