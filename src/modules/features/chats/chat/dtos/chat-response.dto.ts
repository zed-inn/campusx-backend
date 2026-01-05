import { ShortUserSchema } from "@modules/core/profile";
import { ChatModel } from "../chat.model";
import { z } from "zod";

export const ChatSchema = ChatModel.dbSchema.extend({
  friend: ShortUserSchema,
});

export type ChatDto = z.infer<typeof ChatSchema>;
