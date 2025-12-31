import { MessageModel } from "../message.model";
import { z } from "zod";

export const MessageResponseSchema = MessageModel.dbSchema
  .pick({
    chatId: true,
    createDate: true,
    id: true,
    localId: true,
    message: true,
    senderId: true,
    status: true,
    updateDate: true,
  })
  .extend({
    isDeletedByMe: z.boolean("Invalid IsDeletedByMe").default(false),
  });

export type MessageResponseDto = z.infer<typeof MessageResponseSchema>;
