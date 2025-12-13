import { z } from "zod";
import { ForumDbSchema } from "../interfaces/forum.interface";
import { ProfileDbSchema } from "@modules/core/profile";

export const ForumFullAttributesSchema = ForumDbSchema.extend({
  writer: ProfileDbSchema,
  likedByUser: z.boolean().default(false),
});

export type ForumFullAttributesDto = z.infer<typeof ForumFullAttributesSchema>;
