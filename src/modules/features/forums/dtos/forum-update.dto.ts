import { z } from "zod";
import { ForumInterface } from "../interfaces/forum.interface";

export const ForumUpdateSchema = z.object({
  id: ForumInterface.fields.id,
  localId: ForumInterface.fields.localId.optional(),
  title: ForumInterface.fields.title.optional(),
  body: ForumInterface.fields.body.optional(),
  imageUrl: ForumInterface.fields.imageUrl.optional(),
});

export type ForumUpdateDto = z.infer<typeof ForumUpdateSchema>;
