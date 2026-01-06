import { ProfileModel } from "@modules/core/profile";
import { GlobalSchema } from "@shared/dtos/global.dto";
import { z } from "zod";
import { ChatModel } from "../chat.model";

export const ChatGetActiveSchema = z.object({
  userId: ProfileModel.fields.id,
  page: GlobalSchema.fields.page,
});

export type ChatGetActiveDto = z.infer<typeof ChatGetActiveSchema>;

export const ChatGetSingleSchema = z.object({
  id: ChatModel.fields.id,
});

export type ChatGetSingleDto = z.infer<typeof ChatGetSingleSchema>;
