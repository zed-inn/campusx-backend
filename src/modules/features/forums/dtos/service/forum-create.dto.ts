import { z } from "zod";
import { ForumInterface } from "../../interfaces/forum.interface";

export const ForumCreateSchema = ForumInterface.dbSchema.pick({
  localId: true,
  title: true,
  body: true,
  imageUrl: true,
});

export type ForumCreateDto = z.infer<typeof ForumCreateSchema>;
