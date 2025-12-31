import { z } from "zod";
import { ForumModel } from "../posts.model";

export const ForumCreateSchema = ForumModel.dbSchema.pick({
  localId: true,
  title: true,
  body: true,
  imageUrl: true,
});

export type ForumCreateDto = z.infer<typeof ForumCreateSchema>;
