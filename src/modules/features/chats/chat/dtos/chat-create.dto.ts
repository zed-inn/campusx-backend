import { ChatModel } from "../chat.model";
import { z } from "zod";

export const ChatCreateSchema = ChatModel.dbSchema.pick({
  localId: true,
  userOne: true,
  userTwo: true,
});

export type ChatCreateDto = z.infer<typeof ChatCreateSchema>;
