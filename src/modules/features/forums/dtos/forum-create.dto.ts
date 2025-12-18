import { z } from "zod";
import { ForumInterface } from "../interfaces/forum.interface";

export const ForumCreateSchema = z.object({
  localId: ForumInterface.fields.localId.default(null),
  title: ForumInterface.fields.title,
  body: ForumInterface.fields.body.default(null),
  imageUrl: ForumInterface.fields.imageUrl.default(null),
});

export type ForumCreateDto = z.infer<typeof ForumCreateSchema>;
