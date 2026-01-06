import { ChatModel } from "../../chat/chat.model";
import { MessageModel } from "../message.model";
import { z } from "zod";

export const MessageSchema = MessageModel.dbSchema.extend({
  chat: ChatModel.dbSchema.pick({ localId: true }),
});

export type MessageDto = z.infer<typeof MessageSchema>;
