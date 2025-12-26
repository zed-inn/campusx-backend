import { z } from "zod";
import { ForumInterface } from "../../interfaces/forum.interface";
import { ProfileSchema } from "@modules/core/profile/dtos/service/profile-schema.dto";

export const ForumSchema = ForumInterface.dbSchema.extend({
  writer: ProfileSchema,
  isLiked: ForumInterface.extra.fields.isLiked,
});

export type ForumDto = z.infer<typeof ForumSchema>;
