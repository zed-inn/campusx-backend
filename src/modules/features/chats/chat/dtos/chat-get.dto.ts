import { ProfileModel } from "@modules/core/profile";
import { GlobalSchema } from "@shared/dtos/global.dto";
import { z } from "zod";

export const ChatGetActiveSchema = z.object({
  userId: ProfileModel.fields.id,
  page: GlobalSchema.fields.page,
});

export type ChatGetActiveDto = z.infer<typeof ChatGetActiveSchema>;
