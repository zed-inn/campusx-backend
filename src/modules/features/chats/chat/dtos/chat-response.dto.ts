import { ProfileResponseShort } from "@modules/core/profile";
import { ChatModel } from "../chat.model";
import { z } from "zod";

export const ChatResponseSchema = ChatModel.dbSchema
  .pick({
    id: true,
    localId: true,
    createDate: true,
    updateDate: true,
  })
  .extend({
    friendProfile: ProfileResponseShort,
  });

export type ChatResponseDto = z.infer<typeof ChatResponseSchema>;
