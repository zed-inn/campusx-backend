import { z } from "zod";
import { ForumSchema } from "./forum-schema.dto";

export const ForumCreateSchema = ForumSchema.pick({
  localId: true,
  title: true,
  body: true,
  imageUrl: true,
});

export type ForumCreateDto = z.infer<typeof ForumCreateSchema>;
