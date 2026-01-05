import { ChatModel } from "../chat.model";
import { z } from "zod";

export const ChatCreateSchema = z.object({
  localId: ChatModel.fields.localId.default(null),
  userOneId: ChatModel.fields.userOneId,
  userTwoId: ChatModel.fields.userTwoId,
});

export type ChatCreateDto = z.infer<typeof ChatCreateSchema>;
