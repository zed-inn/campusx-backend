import { z } from "zod";
import { ForumInterface } from "../interfaces/forum.interface";

export const ForumCreateSchema = z.object({
  localId: ForumInterface.fields.localId.default(null),
  title: ForumInterface.fields.title,
  body: ForumInterface.fields.body,
  imageUrl: ForumInterface.fields.imageUrl,
});

export type ForumCreateDto = z.infer<typeof ForumCreateSchema>;
