import { z } from "zod";
import { ForumInterface } from "../../interfaces/forum.interface";
import { ProfileSchema } from "@modules/core/profile";

export const ForumSchema = ForumInterface.dbSchema.extend({
  writer: ProfileSchema,
  isLiked: ForumInterface.extra.fields.isLiked,
});

export type ForumDto = z.infer<typeof ForumSchema>;
