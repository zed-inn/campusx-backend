import { z } from "zod";
import { MessageModel } from "../message.model";
import { GlobalSchema } from "@shared/dtos/global.dto";

export const MessageGetChatSchema = z.object({
  chatId: MessageModel.fields.chatId,
  timestamp: GlobalSchema.fields.timestamp,
});

export type MessageGetChatDto = z.infer<typeof MessageGetChatSchema>;

export const MessageGetLatestSchema = z.object({
  page: GlobalSchema.fields.page,
});

export type MessageGetLatestDto = z.infer<typeof MessageGetLatestSchema>;
